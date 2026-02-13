import React, { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
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
  // getCurrentUser,
  // signOut,
  clearError,
  clearConfirmationResult,
  setPhone,
  // resetAuth
} from "../../store/slices/authSlice";

interface PhoneAuthProps {
  onAuthenticated?: () => void;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({ onAuthenticated }) => {
  // Redux state and dispatch
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, confirmationResult, error, phone } =
    useAppSelector((state: RootState) => state.auth);

  // Local state for form inputs
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);

  // Refs
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const otpContainerRef = useRef<HTMLDivElement>(null);
  const phoneFormRef = useRef<HTMLFormElement>(null);

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

  // Auto-close modal 5 seconds after successful authentication
  useEffect(() => {
    if (!isAuthenticated || !user || user.needsProfileCompletion || !onAuthenticated) return;
    const timer = setTimeout(() => {
      onAuthenticated();
    }, 5000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, onAuthenticated]);

  // Focus phone input when login modal opens (phone step visible) so user can type immediately
  useEffect(() => {
    if (confirmationResult) return;
    const timer = setTimeout(() => {
      const input = phoneFormRef.current?.querySelector<HTMLInputElement>("input[type=tel]");
      input?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [confirmationResult]);

  // Focus OTP input when OTP step is shown so user can type immediately
  useEffect(() => {
    if (!confirmationResult || !otpContainerRef.current) return;
    const timer = setTimeout(() => {
      const input = otpContainerRef.current?.querySelector<HTMLInputElement>("[data-input-otp], input");
      if (input) {
        input.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [confirmationResult]);

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
    // Only allow numbers and limit to 10 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    dispatch(setPhone(value));
  };

  const handleSendOtp = async () => {
    dispatch(clearError());

    if (!phone || phone.trim().length !== 10) {
      // Set error in Redux state
      dispatch({
        type: "auth/setError",
        payload: "Please enter a valid 10-digit phone number",
      });
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

    // Add +91 prefix before sending to backend
    const fullPhoneNumber = `+91${phone}`;

    // Dispatch sendOTP action
    dispatch(
      sendOTP({
        phone: fullPhoneNumber,
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

  // const handleSignOut = () => {
  //   dispatch(signOut() as any);
  //   resetLocalForm();
  // };

  // const resetLocalForm = () => {
  //   setOtp("");
  //   setName("");
  //   setEmail("");
  //   setShowUserInfoModal(false);
  // };

  const handleChangePhone = () => {
    dispatch(clearConfirmationResult());
    setOtp("");
    dispatch(clearError());
    // Keep the phone number so user can edit it, +91 prefix will be removed by input display logic
  };

  // console.log("User:", user);

  if (isAuthenticated && user && !user.needsProfileCompletion) {
    return (
      <div className="text-center py-8 px-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-5">
          <CheckCircle className="w-8 h-8" strokeWidth={2} />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          You're all set!
        </h2>
        <p className="text-gray-600 mb-1">
          Welcome{user.name ? `, ${user.name}` : ""}. You're now signed in.
        </p>
        <p className="text-sm text-gray-500">
          You can browse products and place orders. This window will close shortly.
        </p>
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
        <form
          ref={phoneFormRef}
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendOtp();
          }}
        >
          <div className="flex">
            <div className="flex items-center justify-center bg-gray-100 rounded-l-md px-3 border border-gray-300 border-r-0">
              <span className="text-gray-600">🇮🇳</span>
              <span className="text-gray-600 ml-2 font-medium">+91</span>
            </div>
            <Input
              type="tel"
              value={phone.replace(/^\+91/, "")}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit number"
              className="rounded-l-none focus-visible:ring-0"
              disabled={loading}
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={10}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 cursor-pointer"
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
        </form>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerifyOtp();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleVerifyOtp();
            }
          }}
        >
          <div ref={otpContainerRef} className="flex justify-center mb-4">
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
            type="submit"
            className="w-full bg-teal-700 hover:bg-teal-800 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={handleChangePhone}
              className="text-sm text-teal-700 cursor-pointer"
              disabled={loading}
            >
              Change Phone Number
            </Button>
          </div>
        </form>
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
                onChange={(e) => {
                  // Only allow alphabets and spaces
                  const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setName(value);
                }}
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
              className="w-full bg-teal-700 hover:bg-teal-800 cursor-pointer"
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
