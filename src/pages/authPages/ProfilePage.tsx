import React, { useState, useEffect, useRef } from "react";
import {
  FileEdit,
  Save,
  User as UserIcon,
  Phone,
  Mail,
  Calendar,
  Camera,
  LogOut,
  ShoppingBag,
  ShieldCheck,
  Bell,
  X,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { storage } from "../../services/firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { signOut, getCurrentUser, saveUserInfo, updatePassword } from "../../store/slices/authSlice";
import { fetchMembershipStatus } from "../../store/slices/membershipSlice";
import { User } from "../../types/user";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { status: membershipStatus } = useSelector(
    (state: RootState) => state.membership
  );


  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "orders" | "security">("info");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const resultAction = await dispatch(getCurrentUser());
        if (getCurrentUser.fulfilled.match(resultAction)) {
          const userData = resultAction.payload as User;
          setUser(userData);
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
          });
        }
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
    dispatch(fetchMembershipStatus());
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // For phone, only allow digits and +
    if (name === "phone") {
      const cleaned = value.replace(/[^\d+]/g, "").slice(0, 15);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const resultAction = await dispatch(saveUserInfo({
        ...formData,
        profilePicture: user.profilePicture || null,
      }));

      if (saveUserInfo.fulfilled.match(resultAction)) {
        setUser(resultAction.payload as User);
        setEditMode(false);
        setSuccess("Profile updated successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError("Failed to save profile information");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile information");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && user) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError("File size should be less than 2MB");
        return;
      }

      setUploading(true);
      try {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const resultAction = await dispatch(saveUserInfo({
          ...formData,
          profilePicture: downloadURL,
        }));

        if (saveUserInfo.fulfilled.match(resultAction)) {
          setUser(resultAction.payload as User);
          setSuccess("Profile picture updated!");
          setTimeout(() => setSuccess(null), 3000);
        } else {
          setError("Failed to upload profile picture");
        }
      } catch (err) {
        console.error("Error uploading picture:", err);
        setError("Failed to upload profile picture");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleLogout = async () => {
    await dispatch(signOut());
    navigate("/");
  };

  const formatDateSafely = (dateValue: any, formatStr: string = "MMM dd, yyyy") => {
    if (!dateValue) return "N/A";
    try {
      let dateObj: Date;

      if (dateValue && typeof dateValue === 'object') {
        const s = dateValue.seconds ?? dateValue._seconds ?? dateValue.seconds;
        if (typeof s === 'number') {
          dateObj = new Date(s * 1000);
        } else if (dateValue.toDate && typeof dateValue.toDate === 'function') {
          dateObj = dateValue.toDate();
        } else {
          dateObj = new Date(dateValue);
        }
      } else {
        dateObj = new Date(dateValue);
      }

      if (isNaN(dateObj.getTime())) {
        // Attempt to parse strings like "February 18, 2026 at 5:53:18 PM"
        if (typeof dateValue === 'string') {
          const cleaned = dateValue.replace(/\s+at\s+/i, ' ');
          const attempt = new Date(cleaned);
          if (!isNaN(attempt.getTime())) return format(attempt, formatStr);
        }
        return "N/A";
      }

      return format(dateObj, formatStr);
    } catch (err) {
      console.error("Date formatting error:", err);
      return "N/A";
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }

    try {
      setPasswordLoading(true);
      setError(null);
      const resultAction = await dispatch(updatePassword(passwordData.newPassword));

      if (updatePassword.fulfilled.match(resultAction)) {
        setSuccess("Password updated successfully!");
        setIsChangingPassword(false);
        setPasswordData({ newPassword: "", confirmPassword: "" });
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(resultAction.payload as string || "Failed to update password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <UserIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Profile Not Found</h2>
          <p className="text-slate-500 mb-6">We couldn't retrieve your profile details. Please try logging in again.</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Premium Hero Header */}
      <div className="relative h-80 bg-gradient-to-br from-green-700 via-green-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10"></div>

        <div className="max-w-6xl mx-auto px-4 h-full flex items-center md:items-end pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full pt-16 md:pt-0">
            {/* Profile Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name ?? undefined} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-50">
                    <UserIcon className="w-16 h-16 text-green-600" />
                  </div>
                )}

                {uploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 p-2.5 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-110 active:scale-95"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="flex-1 text-center md:text-left mb-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-white mb-1"
              >
                {user?.name || "Welcome Back"}
              </motion.h1>
              <p className="text-green-100 flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-4 h-4" />
                Verified Account
              </p>
            </div>

            {/* Logout removed from here, secondary logout remains in Account Info */}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
              <button
                onClick={() => setActiveTab("info")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'info' ? 'bg-green-50 text-green-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <UserIcon className="w-5 h-5" />
                Account Details
              </button>
              <Link
                to="/orders"
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-600 hover:bg-slate-50`}
              >
                <ShoppingBag className="w-5 h-5" />
                My Orders
              </Link>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'security' ? 'bg-green-50 text-green-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <ShieldCheck className="w-5 h-5" />
                Security
              </button>
              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-slate-600 hover:bg-slate-50`}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  Notifications
                </div>
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                <ShoppingBag className="w-24 h-24" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                {membershipStatus?.isMember ? `${membershipStatus.membershipType} Member` : "Kishan Parivar"}
              </h3>

              {membershipStatus?.isMember ? (
                <div className="space-y-2 mb-4">
                  <p className="text-green-100 text-xs">
                    <span className="font-bold">Started: </span>
                    {formatDateSafely(membershipStatus.membershipStart)}
                  </p>
                  <p className="text-green-100 text-xs">
                    <span className="font-bold">Expires: </span>
                    {formatDateSafely(membershipStatus.membershipEnd)}
                  </p>
                </div>
              ) : (
                <p className="text-green-100 text-sm mb-4">Join Kishan Parivar and save on every purchase!</p>
              )}

              <Link
                to="/kishanParivarPage"
                className="inline-block px-4 py-2 bg-white text-green-700 rounded-lg text-xs font-bold hover:bg-green-50 transition-colors"
              >
                {membershipStatus?.isMember ? "Manage Membership" : "Join Now"}
              </Link>
            </div>
          </div>

          {/* Content Card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Account Information</h2>
                      <p className="text-sm text-slate-500">Manage your personal details and contact info</p>
                    </div>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${editMode ? 'bg-slate-200 text-slate-700' : 'bg-green-600 text-white shadow-md shadow-green-200'}`}
                    >
                      {editMode ? <X className="w-4 h-4" /> : <FileEdit className="w-4 h-4" />}
                      {editMode ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  <div className="p-8">
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm border border-red-100"
                        >
                          <Bell className="w-5 h-5 flex-shrink-0" />
                          {error}
                        </motion.div>
                      )}
                      {success && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl flex items-center gap-3 text-sm border border-green-100"
                        >
                          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                          {success}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <UserIcon className="w-5 h-5" />
                            </div>
                            {editMode ? (
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                placeholder="Your full name"
                              />
                            ) : (
                              <div className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-transparent rounded-xl text-slate-800 font-medium">
                                {user?.name || "Not set"}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <Mail className="w-5 h-5" />
                            </div>
                            {editMode ? (
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                placeholder="email@example.com"
                              />
                            ) : (
                              <div className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-transparent rounded-xl text-slate-800 font-medium">
                                {user?.email || "Not set"}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <Phone className="w-5 h-5" />
                            </div>
                            {editMode ? (
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                placeholder="+91 XXXXX XXXXX"
                              />
                            ) : (
                              <div className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-transparent rounded-xl text-slate-800 font-medium">
                                {user?.phone || "Not set"}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Joined Since</label>
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-transparent rounded-xl text-slate-500 font-medium italic">
                              {formatDateSafely(user?.createdAt, "MMMM dd, yyyy")}
                            </div>
                          </div>
                        </div>
                      </div>

                      {editMode && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-6 flex justify-end"
                        >
                          <button
                            onClick={handleSaveProfile}
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 disabled:opacity-50"
                          >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Save Changes
                          </button>
                        </motion.div>
                      )}

                      {/* Mobile Logout Option */}
                      <div className="pt-10 border-t border-slate-100 mt-10">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-1">Account Actions</p>
                        <button
                          onClick={handleLogout}
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-200 text-green-600 rounded-xl font-bold hover:bg-green-50 hover:border-green-200 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>


                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8"
                >
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className="flex flex-col border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors overflow-hidden">
                      <div className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <ShieldCheck className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">Password</p>
                            <p className="text-sm text-slate-500">Update your account password</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsChangingPassword(!isChangingPassword)}
                          className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold hover:bg-white transition-all"
                        >
                          {isChangingPassword ? "Cancel" : "Change"}
                        </button>
                      </div>

                      <AnimatePresence>
                        {isChangingPassword && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50/50 border-t border-slate-100 p-6"
                          >
                            <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">New Password</label>
                                <input
                                  type="password"
                                  required
                                  value={passwordData.newPassword}
                                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                  placeholder="••••••••"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Confirm New Password</label>
                                <input
                                  type="password"
                                  required
                                  value={passwordData.confirmPassword}
                                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                                  placeholder="••••••••"
                                />
                              </div>
                              <button
                                type="submit"
                                disabled={passwordLoading}
                                className="w-full py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-md shadow-green-100 disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {passwordLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Update Password
                              </button>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Phone Verification</p>
                          <p className="text-sm text-slate-500">Your phone number is verified</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">ACTIVE</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

