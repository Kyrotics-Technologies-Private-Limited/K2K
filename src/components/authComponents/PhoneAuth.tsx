
import React, { useState, useEffect, useRef } from "react";
import { RecaptchaVerifier } from "firebase/auth";
import * as authService from "../../services/api/authApi";
// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
// Import Redux actions
import {
  sendOTP,
  verifyOTP,
  saveUserInfo,
  getCurrentUser,
  signOut,
  clearError,
  clearConfirmationResult,
  setPhone,
  resetAuth
} from "../../store/slices/authSlice";

const PhoneAuth: React.FC = () => {
// Redux state and dispatch
  const dispatch = useAppDispatch();
  const { 
    user,
    isAuthenticated, 
    loading, 
    confirmationResult, 
    error, 
    phone 
  } = useAppSelector((state: RootState) => state.auth);

  // Local state for form inputs
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);

  // Refs
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    // Initialize recaptcha when component mounts
    if (recaptchaWrapperRef.current) {
      recaptchaVerifierRef.current = authService.initRecaptcha(
        recaptchaWrapperRef.current
      );
    }

    return () => {
      // Clean up recaptcha on unmount
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
    };
  }, []);

  // Set user info from Redux when user is loaded
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      
      // If user is authenticated but needs profile completion
      if (user.needsProfileCompletion) {
        setShowUserInfoModal(true);
      }
    }
  }, [user]);

  const validateEmail = (email: string): string => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return "Please enter your email";
    } else if (!regex.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhone(e.target.value));
  };

  const handleSendOtp = async () => {
    dispatch(clearError());

    if (!phone || phone.trim().length < 10) {
      // Set error in Redux state
      dispatch({ type: "auth/setError", payload: "Please enter a valid phone number" });
      return;
    }

    // Re-initialize recaptcha if needed
    if (!recaptchaVerifierRef.current && recaptchaWrapperRef.current) {
      recaptchaVerifierRef.current = authService.initRecaptcha(
        recaptchaWrapperRef.current
      );
    }

    if (!recaptchaVerifierRef.current) {
      dispatch({ type: "auth/setError", payload: "reCAPTCHA not initialized" });
      return;
    }

    // Dispatch sendOTP action
    dispatch(
      sendOTP({
        phone,
        recaptchaVerifier: recaptchaVerifierRef.current,
      })
    );
  };

  const handleVerifyOtp = () => {
    dispatch(clearError());

    if (!confirmationResult) {
      dispatch({ type: "auth/setError", payload: "Request OTP first." });
      return;
    }

    if (!otp || otp.trim().length !== 6) {
      dispatch({ type: "auth/setError", payload: "Please enter 6-digit OTP" });
      return;
    }

    // Dispatch verifyOTP action
    dispatch(
      verifyOTP({
        confirmationResult,
        otp,
      })
    );
  };

  const handleSaveUserInfo = () => {
    dispatch(clearError());

    const emailError = validateEmail(email);
    if (emailError) {
      dispatch({ type: "auth/setError", payload: emailError });
      return;
    }

    if (!name.trim()) {
      dispatch({ type: "auth/setError", payload: "Please enter your name" });
      return;
    }

    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;

    // Dispatch saveUserInfo action
    dispatch(
      saveUserInfo({
        name,
        phone: formattedPhone,
        email,
      }) as any
    ).then(() => {
      setShowUserInfoModal(false);
    });
  };

  const handleSignOut = () => {
    dispatch(signOut() as any);
    resetLocalForm();
  };

  const resetLocalForm = () => {
    setOtp("");
    setName("");
    setEmail("");
    setShowUserInfoModal(false);
  };

  const handleChangePhone = () => {
    dispatch(clearConfirmationResult());
    setOtp("");
    dispatch(clearError());
  };

  // console.log("User:", user);

  if (isAuthenticated && user && !user.needsProfileCompletion) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold mb-4">
          Authentication Successful
        </h2>
        <p className="mb-4">Welcome{user.name ? `, ${user.name}` : ""}!</p>
        {/* <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button> */}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      {/* Header with logo */}
      <div className="text-center mb-6">
        <img
          src="/assets/images/K2K Logo.png"
          alt="Company Logo"
          className="mx-auto mb-2 h-16 w-16 object-cover rounded-md"
        />
        <h2 className="text-xl font-medium">Sign In</h2>
      </div>

      {/* Phone input or OTP input */}
      {!confirmationResult ? (
        <div className="space-y-4">
          <div className="flex">
            <div className="flex items-center justify-center bg-gray-100 rounded-l-md px-2 border border-gray-300 border-r-0">
              <span className="text-gray-600 mr-2">🇮🇳</span>
            </div>
            <Input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="10-digit phone number"
              className="rounded-l-none focus-visible:ring-0"
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleSendOtp}
            className="w-full bg-teal-700 hover:bg-teal-800"
            disabled={loading}
          >
            {loading ? "Sending..." : "Login"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="text-xs text-gray-500 mt-2">
            By proceeding, you are agreeing to our{" "}
            <a href="#" className="text-gray-700">
              T&C
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-700">
              Privacy policy
            </a>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerifyOtp}
            className="w-full bg-teal-700 hover:bg-teal-800"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="text-center">
            <Button
              variant="link"
              onClick={handleChangePhone}
              className="text-sm text-teal-700"
              disabled={loading}
            >
              Change Phone Number
            </Button>
          </div>
        </div>
      )}

      <div ref={recaptchaWrapperRef} className="mt-4"></div>

      {/* Powered by text */}
      <div className="text-center text-xs text-gray-500 mt-6">
        Powered by <span className="font-medium">kishan2kitchen</span>
      </div>

      {/* User Info Modal */}
      <Dialog
        open={showUserInfoModal}
        onOpenChange={(open) => {
          if (!loading) setShowUserInfoModal(open);
        }}
      >
        <DialogContent className="sm:max-w-md p-6">
          <h2 className="text-xl font-medium text-center mb-4">
            Complete Your Profile
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-1 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Enter your email"
              />
            </div>

            <Button
              onClick={handleSaveUserInfo}
              className="w-full bg-teal-700 hover:bg-teal-800"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhoneAuth;