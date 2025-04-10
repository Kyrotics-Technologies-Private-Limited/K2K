import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Ensure this CSS is loaded
import { Button, TextField, Paper, Typography } from "@mui/material";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult, // Type for the confirmation result object
  Auth, // Type for the auth instance
} from "firebase/auth";
import { auth } from "../firebase"; // Make sure this path points to your initialized Firebase auth instance

const PhoneAuth: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null); // Ref for the container div
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const [error, setError] = useState<string>(""); // Optional: State for displaying errors in UI

  // --- Step 1: Initialize reCAPTCHA on Mount ---
  useEffect(() => {
    // Ensure auth is loaded and the container div exists
    if (!auth || !recaptchaWrapperRef.current) {
      console.error(
        "Firebase auth not initialized or reCAPTCHA container not found"
      );
      setError("Initialization failed. Please refresh."); // Set UI error
      return;
    }

    // Initialize reCAPTCHA verifier only once
    // Ensure previous instance is cleared if component remounts unexpectedly (though unlikely with [])
    if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
    }

    try {
      // Use the ref to the div element
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth as Auth, // Cast auth to Auth type if needed by your setup
        recaptchaWrapperRef.current, // Pass the DOM element ref directly
        {
          size: "invisible",
          callback: (response: any) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // Usually automatically triggered for invisible reCAPTCHA on sign-in attempt.
            console.log("reCAPTCHA verified", response);
          },
          "expired-callback": () => {
            // Response expired. User needs to trigger action again (e.g., click Send OTP again).
            // Firebase handles needing a new token internally when you call signInWithPhoneNumber again.
            console.log("reCAPTCHA expired. Please try sending OTP again.");
            setError("reCAPTCHA expired. Please try sending OTP again."); // Set UI error
            // No need to manually clear/re-initialize here typically.
          },
        }
      );

      // Render the reCAPTCHA (necessary for invisible type)
      recaptchaVerifierRef.current.render().then((widgetId: number) => {
         console.log("reCAPTCHA rendered with widget ID:", widgetId);
         // You might store widgetId if you need to programmatically interact later, but often not needed.
      }).catch(err => {
        console.error("reCAPTCHA render failed:", err);
        setError("Could not render reCAPTCHA. Check configuration."); // Set UI error
      });


      console.log("reCAPTCHA initialized successfully");
      setError(""); // Clear any previous init error

    } catch (initError) {
      console.error("reCAPTCHA initialization failed:", initError);
      setError("reCAPTCHA setup failed. Please refresh."); // Set UI error
    }

    // Cleanup function to clear reCAPTCHA on component unmount
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null; // Help garbage collection
        console.log("reCAPTCHA cleared on unmount");
      }
    };
  }, []); // Empty dependency array: Run only once on mount

  // --- Step 2: Send OTP ---
  const sendOtp = async () => {
    setError(""); // Clear previous errors
    if (!recaptchaVerifierRef.current) {
      console.error("reCAPTCHA verifier not ready");
      setError("reCAPTCHA not ready. Please wait or refresh."); // Set UI error
      // alert("reCAPTCHA verifier not ready. Please try again shortly.");
      return;
    }

    if (cooldown) {
      alert(`Please wait ${cooldownTime} seconds before requesting another OTP`);
      return;
    }

    // Check if phone number is valid (basic check)
    if (!phone || phone.trim().length < 10) { // Basic length check
      console.error("Phone number is invalid:", phone);
      setError("Please enter a valid phone number with country code."); // Set UI error
      // alert("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);

    try {
      // Ensure phone number has '+' prefix for Firebase
      let formattedPhone = phone;
      if (!formattedPhone.startsWith("+")) {
        formattedPhone = "+" + formattedPhone;
      }

      console.log("Sending OTP to:", formattedPhone);

      // Pass the initialized RecaptchaVerifier instance
      const confirmation = await signInWithPhoneNumber(
        auth as Auth, // Cast if needed
        formattedPhone,
        recaptchaVerifierRef.current // Pass the verifier instance
      );

      setConfirmationResult(confirmation); // Store confirmation result to use for verification
      console.log("OTP sent successfully");
      setOtp(""); // Clear any previous OTP input
      startCooldown(); // Start cooldown timer after successful send

    } catch (error: any) { // Catch specific Firebase errors if needed
      console.error("Error sending OTP:", error);

      // Provide specific feedback based on error code
      let errorMessage = `Error sending OTP: ${error.message || String(error)}`;
      if (error.code === 'auth/invalid-phone-number') {
          errorMessage = "Invalid phone number format. Please include the country code (e.g., +91).";
      } else if (error.code === 'auth/too-many-requests') {
          errorMessage = "Too many requests. Please wait before trying again.";
          startCooldown(120); // Longer cooldown for rate limits
      } else if (error.message?.includes('reCAPTCHA')) {
          // Handle potential reCAPTCHA errors explicitly if they occur
          errorMessage = "reCAPTCHA check failed. Please try again.";
      }
       else {
          // Default cooldown for other errors
          startCooldown(30);
      }

      setError(errorMessage); // Set UI error
      // alert(errorMessage); // Or use alert

      // No need to manually reset reCAPTCHA here in most cases.
      // If user tries again, signInWithPhoneNumber will re-trigger reCAPTCHA if needed.

    } finally {
      setIsLoading(false);
    }
  };

  // --- Cooldown Timer Logic ---
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

  // --- Step 3: Verify OTP ---
  const verifyOtp = async () => {
    setError(""); // Clear previous errors
    if (!confirmationResult) {
      console.error("Confirmation result is missing.");
      setError("Please request an OTP first."); // Set UI error
      // alert("Please send OTP first.");
      return;
    }
    if (!otp || otp.trim().length !== 6) { // Basic OTP format check
        console.error("Invalid OTP format");
        setError("Please enter the 6-digit OTP."); // Set UI error
        // alert("Please enter the 6-digit OTP.");
        return;
    }


    setIsLoading(true);

    try {
      const result = await confirmationResult.confirm(otp); // Verify the OTP
      // User signed in successfully.
      console.log("Phone number verified! User:", result.user);
      alert("Phone verified successfully!"); // Simple success feedback

      // TODO: Handle successful verification:
      // - Update application state (e.g., set user context)
      // - Redirect user (e.g., navigate('/dashboard'))
      // - Clear phone/OTP state if needed
      // setPhone("");
      // setOtp("");
      // setConfirmationResult(null);

    } catch (error: any) { // Catch specific Firebase errors
      console.error("OTP verification failed:", error);
      let errorMessage = `Verification failed: ${error.message || String(error)}`;
       if (error.code === 'auth/invalid-verification-code') {
           errorMessage = "Invalid OTP code. Please check and try again.";
       } else if (error.code === 'auth/code-expired') {
            errorMessage = "OTP code expired. Please request a new one.";
            // Optionally reset the view to request OTP again
            setConfirmationResult(null);
            setOtp("");
       }
      setError(errorMessage); // Set UI error
      // alert(errorMessage); // Or use alert
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Component ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <Paper elevation={3} className="p-6 sm:p-10 max-w-md w-full">
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Phone Number Login
        </Typography>

        {/* Display Errors */}
        {error && (
            <Typography color="error" align="center" style={{ marginBottom: '1rem' }}>
                {error}
            </Typography>
        )}

        {!confirmationResult ? (
          // Stage 1: Enter Phone Number
          <>
            <PhoneInput
              country={"in"} // Default country (India)
              value={phone}
              onChange={(value) => {
                // value includes country code automatically
                setPhone(value);
              }}
              inputStyle={{ width: "100%", height: "56px" /* Match MUI TextField */}}
              inputProps={{
                name: 'phone', // Add name and potentially id for accessibility/testing
                id: 'phone-input',
                required: true,
                autoFocus: true,
                disabled: isLoading, // Disable while loading
              }}
              containerStyle={{ marginBottom: "16px" }} // Spacing below input
            />

            <Button
              onClick={sendOtp}
              fullWidth
              variant="contained"
              disabled={!phone || isLoading || cooldown} // Disable conditions
              sx={{ marginTop: "8px", height: '48px' }} // Consistent button height
            >
              {isLoading ? "Sending..." : cooldown ? `Wait ${cooldownTime}s` : "Send OTP"}
            </Button>
          </>
        ) : (
          // Stage 2: Enter OTP
          <>
            <Typography align="center" sx={{ mb: 2 }}>
              Enter the OTP sent to +{phone} {/* Show formatted number */}
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
                 maxLength: 6, // Enforce 6 digits
                 autoComplete: "one-time-code" // Helps browsers/OS autofill OTP
              }}
              disabled={isLoading} // Disable while loading
              autoFocus // Focus on OTP field when it appears
            />

            <Button
              sx={{ marginTop: "16px", height: '48px' }}
              fullWidth
              variant="contained"
              onClick={verifyOtp}
              disabled={!otp || otp.length !== 6 || isLoading} // Disable conditions
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <Button
                sx={{ marginTop: "8px" }}
                fullWidth
                variant="text" // Less prominent button for changing number
                onClick={() => {
                    setConfirmationResult(null); // Go back to phone input stage
                    setOtp("");
                    setError(""); // Clear errors when going back
                }}
                disabled={isLoading}
            >
                Change Phone Number
            </Button>
          </>
        )}

        {/* Invisible reCAPTCHA container - MUST be in the DOM */}
        {/* Assign the ref here */}
        <div ref={recaptchaWrapperRef} id="recaptcha-container-wrapper" style={{ marginTop: "1rem" }}></div>

      </Paper>
    </div>
  );
};

export default PhoneAuth;