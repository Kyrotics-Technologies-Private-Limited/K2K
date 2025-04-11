import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button, TextField, Paper, Typography } from "@mui/material";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  Auth,
} from "firebase/auth";
import { auth } from "../firebase";

const PhoneAuth: React.FC = () => {
  // Added name state
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const [error, setError] = useState<string>("");
  // Added verification success state
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    if (!auth || !recaptchaWrapperRef.current) {
      console.error(
        "Firebase auth not initialized or reCAPTCHA container not found"
      );
      setError("Initialization failed. Please refresh.");
      return;
    }

    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
    }

    try {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth as Auth,
        recaptchaWrapperRef.current,
        {
          size: "invisible",
          callback: (response: string | null) => {
            console.log("reCAPTCHA verified", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired. Please try sending OTP again.");
            setError("reCAPTCHA expired. Please try sending OTP again.");
          },
        }
      );

      recaptchaVerifierRef.current
        .render()
        .then((widgetId: number) => {
          console.log("reCAPTCHA rendered with widget ID:", widgetId);
        })
        .catch((err) => {
          console.error("reCAPTCHA render failed:", err);
          setError("Could not render reCAPTCHA. Check configuration.");
        });

      console.log("reCAPTCHA initialized successfully");
      setError("");
    } catch (initError) {
      console.error("reCAPTCHA initialization failed:", initError);
      setError("reCAPTCHA setup failed. Please refresh.");
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
        console.log("reCAPTCHA cleared on unmount");
      }
    };
  }, []);

  const validateName = (): boolean => {
    if (!name.trim()) {
      setError("Please enter your name");
      return false;
    }
    return true;
  };

  const sendOtp = async () => {
    setError("");

    // Validate name first
    if (!validateName()) {
      return;
    }

    if (!recaptchaVerifierRef.current) {
      console.error("reCAPTCHA verifier not ready");
      setError("reCAPTCHA not ready. Please wait or refresh.");
      return;
    }

    if (cooldown) {
      alert(
        `Please wait ${cooldownTime} seconds before requesting another OTP`
      );
      return;
    }

    if (!phone || phone.trim().length < 10) {
      console.error("Phone number is invalid:", phone);
      setError("Please enter a valid phone number with country code.");
      return;
    }

    setIsLoading(true);

    try {
      let formattedPhone = phone;
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = "+" + formattedPhone;
      }

      console.log("Sending OTP to:", formattedPhone);

      const confirmation = await signInWithPhoneNumber(
        auth as Auth,
        formattedPhone,
        recaptchaVerifierRef.current
      );

      setConfirmationResult(confirmation);
      console.log("OTP sent successfully");
      setOtp("");
      startCooldown();
    } catch (error: any) {
      console.error("Error sending OTP:", error);

      let errorMessage = `Error sending OTP: ${error.message || String(error)}`;
      if (error.code === "auth/invalid-phone-number") {
        errorMessage =
          "Invalid phone number format. Please include the country code (e.g., +91).";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please wait before trying again.";
        startCooldown(120);
      } else if (error.message?.includes("reCAPTCHA")) {
        errorMessage = "reCAPTCHA check failed. Please try again.";
      } else {
        startCooldown(30);
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const startCooldown = (seconds = 60) => {
    setCooldown(true);
    setCooldownTime(seconds);

    const intervalId = setInterval(() => {
      setCooldownTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          setCooldown(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const verifyOtp = async () => {
    setError("");
    if (!confirmationResult) {
      setError("Please request an OTP first.");
      return;
    }

    if (!otp || otp.trim().length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      console.log("Phone number verified! User:", result.user);
      setIsVerified(true); // Set verification success state

      // You can add additional user data to Firebase here if needed
      // For example, updating the user's display name with the provided name
      // await updateProfile(result.user, { displayName: name });

      console.log(`User ${name} verified successfully with phone ${phone}`);
    } catch (error: any) {
      console.error("OTP verification failed:", error);

      let errorMessage = "OTP verification failed. Please try again.";
      if (error.code === "auth/invalid-verification-code") {
        errorMessage = "Invalid OTP. Please enter the correct 6-digit code.";
      } else if (error.code === "auth/code-expired") {
        errorMessage = "OTP expired. Please request a new one.";
        setConfirmationResult(null);
        setOtp("");
      } else if (error.code === "auth/missing-verification-code") {
        errorMessage = "Verification code missing. Try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
        startCooldown(120);
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setName("");
    setPhone("");
    setOtp("");
    setConfirmationResult(null);
    setIsVerified(false);
    setError("");
  };

  return (
    <Paper elevation={3} className="p-6 sm:p-10 max-w-md w-full">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 600,
          letterSpacing: 0.3,
          color: "green",
          mb: 3,
          position: "relative",
          "&:after": {
            content: '""',
            display: "block",
            width: "40px",
            height: "2px",
            backgroundColor: "primary.main",
            margin: "16px auto 0",
            borderRadius: "2px",
          },
        }}
      >
        {isVerified ? "Verification Complete" : "Enter Your Details"}
      </Typography>

      {error && (
        <Typography
          color="error"
          align="center"
          style={{ marginBottom: "1rem" }}
        >
          {error}
        </Typography>
      )}

      {isVerified ? (
        // Success screen after verification
        <>
          <Typography align="center" sx={{ mb: 3 }}>
            Thank you, {name}! Your phone number has been verified successfully.
          </Typography>
          <Button
            onClick={resetForm}
            fullWidth
            variant="contained"
            sx={{ height: "48px", bgcolor: "green" }}
          >
            Start Over
          </Button>
        </>
      ) : !confirmationResult ? (
        // Stage 1: Enter Name and Phone Number
        <>
          <TextField
            fullWidth
            variant="outlined"
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            disabled={isLoading}
            autoFocus
            sx={{ mb: 3 }}
            inputProps={{
              maxLength: 50,
            }}
          />

          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(value) => setPhone(value)}
            inputStyle={{
              width: "100%",
              height: "56px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              paddingLeft: "60px",
            }}
            buttonStyle={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #ced4da",
              borderRadius: "8px 0 0 8px",
              borderRight: "none",
              padding: "0 10px 0 15px",
            }}
            dropdownStyle={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "1px solid #e0e0e0",
            }}
            inputProps={{
              name: "phone",
              id: "phone-input",
              required: true,
              disabled: isLoading,
              "aria-label": "Phone number input",
              "aria-required": "true",
            }}
            containerStyle={{
              marginBottom: "24px",
              fontFamily: "'Roboto', sans-serif",
            }}
            dropdownClass="phone-input-dropdown"
            searchClass="phone-input-search"
          />

          <Button
            onClick={sendOtp}
            fullWidth
            variant="contained"
            disabled={!name || !phone || isLoading || cooldown}
            sx={{ marginTop: "8px", height: "48px", bgcolor: "green" }}
          >
            {isLoading
              ? "Sending..."
              : cooldown
              ? `Wait ${cooldownTime}s`
              : "Send OTP"}
          </Button>
        </>
      ) : (
        // Stage 2: Enter OTP
        <>
          <Typography align="center" sx={{ mb: 1 }}>
            Hi {name},
          </Typography>
          <Typography align="center" sx={{ mb: 2 }}>
            Enter the OTP sent to +{phone}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter 6-Digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 6,
              autoComplete: "one-time-code",
            }}
            disabled={isLoading}
            autoFocus
          />

          <Button
            sx={{ marginTop: "16px", height: "48px" }}
            fullWidth
            variant="contained"
            onClick={verifyOtp}
            disabled={!otp || otp.length !== 6 || isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
            sx={{ marginTop: "8px" }}
            fullWidth
            variant="text"
            onClick={() => {
              setConfirmationResult(null);
              setOtp("");
              setError("");
            }}
            disabled={isLoading}
          >
            Change Details
          </Button>
        </>
      )}

      <div
        ref={recaptchaWrapperRef}
        id="recaptcha-container-wrapper"
        style={{ marginTop: "1rem" }}
      ></div>
    </Paper>
  );
};

export default PhoneAuth;
