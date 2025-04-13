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
import { auth, db } from "../firebase"; // Make sure this is correctly configured
import { doc, setDoc } from "firebase/firestore";

const PhoneAuth: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!auth || !recaptchaWrapperRef.current) return;

    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
    }

    try {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth as Auth,
        recaptchaWrapperRef.current,
        {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => {
            setError("reCAPTCHA expired. Please try again.");
          },
        }
      );
      recaptchaVerifierRef.current.render();
    } catch (err) {
      console.error("reCAPTCHA init failed:", err);
      setError("reCAPTCHA initialization failed. Please refresh the page.");
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Please enter your email");
      return false;
    } else if (!regex.test(email)) {
      setError("Invalid email address");
      return false;
    }
    return true;
  };

  const sendOtp = async () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail()) return;

    if (!recaptchaVerifierRef.current) {
      setError("reCAPTCHA not ready. Please refresh.");
      return;
    }

    if (cooldown) return;

    if (!phone || phone.trim().length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);

    try {
      const fullPhone = phone.startsWith("+") ? phone : `+${phone}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhone,
        recaptchaVerifierRef.current
      );
      setConfirmationResult(confirmation);
      startCooldown();
    } catch (err: any) {
      let msg = "Error sending OTP";
      if (err.code === "auth/invalid-phone-number") {
        msg = "Invalid phone number format.";
      } else if (err.code === "auth/too-many-requests") {
        msg = "Too many requests. Please wait before retrying.";
        startCooldown(120);
      } else if (err.message?.includes("reCAPTCHA")) {
        msg = "reCAPTCHA check failed. Please refresh the page.";
        setError(msg); // Update error message
        recaptchaVerifierRef.current?.clear(); // Reset reCAPTCHA
        recaptchaVerifierRef.current?.render(); // Re-render reCAPTCHA
      } else {
        startCooldown(30);
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");

    if (!confirmationResult) {
      setError("Request OTP first.");
      return;
    }

    if (!otp || otp.trim().length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const fullPhone = phone.startsWith("+") ? phone : `+${phone}`;
      await setDoc(
        doc(db, "users", fullPhone),
        {
          name,
          email,
          phone: fullPhone,
          uid: user.uid,
          verifiedAt: new Date(),
        },
        { merge: true }
      );

      setIsVerified(true);
    } catch (err: any) {
      let msg = "Verification failed";
      if (err.code === "auth/invalid-verification-code") {
        msg = "Invalid OTP code";
      } else if (err.code === "auth/code-expired") {
        msg = "OTP expired. Request a new one.";
        setConfirmationResult(null);
      } else if (err.code === "auth/too-many-requests") {
        msg = "Too many attempts. Try again later.";
        startCooldown(120);
      }
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const startCooldown = (seconds = 60) => {
    setCooldown(true);
    setCooldownTime(seconds);
    const interval = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
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
        align="center"
        sx={{ fontWeight: 600, color: "green", mb: 3 }}
      >
        {isVerified ? "Verification Complete" : "Phone Verification"}
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {isVerified ? (
        <>
          <Typography align="center" sx={{ mb: 3 }}>
            Thank you, {name}! Your phone number has been verified.
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
        <>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            disabled={isLoading}
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            disabled={isLoading}
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
              border: "1px solid #ccc",
              paddingLeft: "60px",
            }}
            buttonStyle={{
              borderRadius: "8px 0 0 8px",
              border: "1px solid #ccc",
            }}
            containerStyle={{ marginBottom: "16px" }}
            inputProps={{
              name: "phone",
              required: true,
              disabled: isLoading,
            }}
          />
          <Button
            onClick={sendOtp}
            fullWidth
            variant="contained"
            disabled={!name || !email || !phone || isLoading || cooldown}
            sx={{ mt: 2, height: "48px", bgcolor: "green" }}
          >
            {isLoading
              ? "Sending..."
              : cooldown
              ? `Wait ${cooldownTime}s`
              : "Send OTP"}
          </Button>
        </>
      ) : (
        <>
          <Typography align="center" sx={{ mb: 1 }}>
            Enter OTP sent to +{phone}
          </Typography>
          <TextField
            fullWidth
            label="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
            disabled={isLoading}
          />
          <Button
            onClick={verifyOtp}
            fullWidth
            variant="contained"
            disabled={!otp || otp.length !== 6 || isLoading}
            sx={{ mt: 2, height: "48px", bgcolor: "green" }}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
          <Button
            onClick={() => {
              setConfirmationResult(null);
              setOtp("");
              setError("");
            }}
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            disabled={isLoading}
          >
            Change Details
          </Button>
        </>
      )}

      <div ref={recaptchaWrapperRef} style={{ marginTop: "1rem" }} />
    </Paper>
  );
};

export default PhoneAuth;
