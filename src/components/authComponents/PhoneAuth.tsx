// import React, { useState, useEffect, useRef } from "react";
// import * as authService from "../../services/api/authApi";
// import {
//   sendOTP,
//   verifyOTP,
//   saveUserInfo,
//   getCurrentUser,
//   signOut,
//   clearError,
//   clearConfirmationResult,
//   setPhone,
// } from "../../store/slices/authSlice";
// import { useAppDispatch } from "../../store/store";

// import { RecaptchaVerifier, ConfirmationResult } from "firebase/auth";

// // shadcn/ui components
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Dialog, DialogContent } from "@/components/ui/dialog";

// const PhoneAuth: React.FC = () => {
//   // States for authentication
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] =
//     useState<ConfirmationResult | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // States for user info
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [showUserInfoModal, setShowUserInfoModal] = useState(false);

//   // States for operation
//   const recaptchaWrapperRef = useRef<HTMLDivElement>(null);
//   const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const dispatch = useAppDispatch();
//   const {
//     user,
//     isAuthenticated,
//     loading,
//     confirmationResult,
//     error,
//     phone,
//   } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // Check if user is already authenticated
//     if (authService.isAuthenticated()) {
//       setIsAuthenticated(true);
//       fetchUserData();
//     }

//     // Initialize recaptcha when component mounts
//     if (recaptchaWrapperRef.current) {
//       recaptchaVerifierRef.current = authService.initRecaptcha(
//         recaptchaWrapperRef.current
//       );
//     }

//     return () => {
//       // Clean up recaptcha on unmount
//       if (recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current.clear();
//       }
//     };
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const userData = await authService.getCurrentUser();
//       setName(userData.name || "");
//       setEmail(userData.email || "");
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const validateEmail = (email: string): string => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) {
//       return "Please enter your email";
//     } else if (!regex.test(email)) {
//       return "Invalid email address";
//     }
//     return "";
//   };

//   const sendOtp = async () => {
//     setError("");

//     if (!phone || phone.trim().length < 10) {
//       setError("Please enter a valid phone number");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Re-initialize recaptcha if needed
//       if (!recaptchaVerifierRef.current && recaptchaWrapperRef.current) {
//         recaptchaVerifierRef.current = authService.initRecaptcha(
//           recaptchaWrapperRef.current
//         );
//       }

//       if (!recaptchaVerifierRef.current) {
//         throw new Error("reCAPTCHA not initialized");
//       }

//       const confirmation = await authService.sendOTP(
//         phone,
//         recaptchaVerifierRef.current
//       );
//       setConfirmationResult(confirmation);
//     } catch (err: any) {
//       let msg = "Error sending OTP";
//       if (err.code === "auth/invalid-phone-number") {
//         msg = "Invalid phone number format.";
//       } else if (err.code === "auth/too-many-requests") {
//         msg = "Too many requests. Please wait before retrying.";
//       } else if (err.message?.includes("reCAPTCHA")) {
//         msg = "reCAPTCHA check failed. Please refresh the page.";
//         // Reset reCAPTCHA verifier
//         if (recaptchaWrapperRef.current) {
//           if (recaptchaVerifierRef.current) {
//             recaptchaVerifierRef.current.clear();
//           }
//           recaptchaVerifierRef.current = authService.initRecaptcha(
//             recaptchaWrapperRef.current
//           );
//         }
//       }
//       setError(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     setError("");

//     if (!confirmationResult) {
//       setError("Request OTP first.");
//       return;
//     }

//     if (!otp || otp.trim().length !== 6) {
//       setError("Please enter 6-digit OTP");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       await authService.verifyOTP(confirmationResult, otp);
//       setIsAuthenticated(true);

//       // Check if user info exists in the database
//       try {
//         const userCheck = await authService.checkUserExists();

//         if (userCheck.exists && userCheck.user) {
//           // User exists, set the user info
//           setName(userCheck.user.name || "");
//           setEmail(userCheck.user.email || "");
//         } else {
//           // User doesn't exist, show the modal to collect info
//           setShowUserInfoModal(true);
//         }
//       } catch (checkError) {
//         console.error("Error checking user existence:", checkError);
//         // If there's an error, still show the modal to be safe
//         setShowUserInfoModal(true);
//       }
//     } catch (err: any) {
//       let msg = "Verification failed";
//       if (err.code === "auth/invalid-verification-code") {
//         msg = "Invalid OTP code";
//       } else if (err.code === "auth/code-expired") {
//         msg = "OTP expired. Request a new one.";
//         setConfirmationResult(null);
//       } else if (err.code === "auth/too-many-requests") {
//         msg = "Too many attempts. Try again later.";
//       }
//       setError(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const saveUserInfo = async () => {
//     setError("");

//     const emailError = validateEmail(email);
//     if (emailError) {
//       setError(emailError);
//       return;
//     }

//     if (!name.trim()) {
//       setError("Please enter your name");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const fullPhone = phone.startsWith("+") ? phone : `+${phone}`;

//       await authService.saveUserInfo({
//         name,
//         phone: fullPhone,
//         email,
//       });

//       setShowUserInfoModal(false);
//     } catch (err: any) {
//       console.error("Error saving user info:", err);
//       setError("Failed to save user information. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await authService.signOutUser();
//       resetForm();
//     } catch (error) {
//       console.error("Error signing out:", error);
//       setError("Error signing out. Please try again.");
//     }
//   };

//   const resetForm = () => {
//     setPhone("");
//     setOtp("");
//     setName("");
//     setEmail("");
//     setConfirmationResult(null);
//     setIsAuthenticated(false);
//     setShowUserInfoModal(false);
//     setError("");
//   };

//   if (isAuthenticated) {
//     return (
//       <div className="text-center p-6">
//         <h2 className="text-xl font-semibold mb-4">
//           Authentication Successful
//         </h2>
//         <p className="mb-4">Welcome{name ? `, ${name}` : ""}!</p>
//         {/* <Button onClick={handleSignOut} variant="outline">
//           Sign Out
//         </Button> */}
//       </div>
//     );
//   }

//   return (
//     <div className="  p-4 bg-white rounded-md shadow-sm">
//       {/* Header with logo */}
//       <div className="text-center mb-6">
//         <img
//           src="/assets/images/K2K Logo.png"
//           alt="Company Logo"
//           className="mx-auto mb-2 h-16 w-16 object-cover rounded-md"
//         />
//         <h2 className="text-xl font-medium">Sign In</h2>
//       </div>

//       {/* Phone input or OTP input */}
//       {!confirmationResult ? (
//         <div className="space-y-4">
//           <div className="flex">
//             <div className="flex items-center justify-center bg-gray-100 rounded-l-md px-2 border border-gray-300 border-r-0">
//               <span className="text-gray-600 mr-2">🇮🇳</span>
//             </div>
//             <Input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="10-digit phone number"
//               className="rounded-l-none focus-visible:ring-0"
//               disabled={isLoading}
//             />
//           </div>

//           <Button
//             onClick={sendOtp}
//             className="w-full bg-teal-700 hover:bg-teal-800"
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Login"}
//           </Button>

//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//           <p className="text-xs text-gray-500 mt-2">
//             By proceeding, you are agreeing to our{" "}
//             <a href="#" className="text-gray-700">
//               T&C
//             </a>{" "}
//             and{" "}
//             <a href="#" className="text-gray-700">
//               Privacy policy
//             </a>
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="flex justify-center mb-4">
//             <InputOTP
//               maxLength={6}
//               value={otp}
//               onChange={(value) => setOtp(value)}
//               disabled={isLoading}
//             >
//               <InputOTPGroup>
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>
//           </div>

//           <Button
//             onClick={verifyOtp}
//             className="w-full bg-teal-700 hover:bg-teal-800"
//             disabled={isLoading}
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </Button>

//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//           <div className="text-center">
//             <Button
//               variant="link"
//               onClick={() => {
//                 setConfirmationResult(null);
//                 setOtp("");
//                 setError("");
//               }}
//               className="text-sm text-teal-700"
//               disabled={isLoading}
//             >
//               Change Phone Number
//             </Button>
//           </div>
//         </div>
//       )}

//       <div ref={recaptchaWrapperRef} className="mt-4"></div>

//       {/* Powered by text */}
//       <div className="text-center text-xs text-gray-500 mt-6">
//         Powered by <span className="font-medium">kishan2kitchen</span>
//       </div>

//       {/* User Info Modal */}
//       <Dialog
//         open={showUserInfoModal}
//         onOpenChange={(open) => {
//           if (!isLoading) setShowUserInfoModal(open);
//         }}
//       >
//         <DialogContent className="sm:max-w-md p-6">
//           <h2 className="text-xl font-medium text-center mb-4">
//             Complete Your Profile
//           </h2>

//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//           <div className="space-y-4">
//             <div>
//               <label className="text-sm text-gray-700 mb-1 block">Name</label>
//               <Input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 disabled={isLoading}
//                 placeholder="Enter your name"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-700 mb-1 block">Email</label>
//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={isLoading}
//                 placeholder="Enter your email"
//               />
//             </div>

//             <Button
//               onClick={saveUserInfo}
//               className="w-full bg-teal-700 hover:bg-teal-800"
//               disabled={isLoading}
//             >
//               {isLoading ? "Saving..." : "Save"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default PhoneAuth;



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

  if (isAuthenticated && user) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold mb-4">
          Authentication Successful
        </h2>
        <p className="mb-4">Welcome{user.name ? `, ${user.name}` : ""}!</p>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
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