import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaCheckCircle,
  FaCalendarAlt,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { db, storage } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FileEdit } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  joinDate: string;
  isVerified: boolean;
  description: string;
  rating: number;
  reviews: number;
  profilePicture?: string;
  socialLinks?: {
    linkedIn?: string;
    instagram?: string;
    website?: string;
  };
}

const UserProfilePage: React.FC = () => {
  const { user: authUser, loading: authLoading } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    description: "",
    linkedIn: "",
    instagram: "",
    website: "",
  });

  const fetchUserData = async (uid: string): Promise<UserProfile> => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as UserProfile;
      } else {
        // Create a new user document if it doesn't exist
        const newUser: UserProfile = {
          id: uid,
          name: authUser?.displayName || "",
          email: authUser?.email || "",
          role: "",
          location: "",
          joinDate: new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          isVerified: false,
          description: "",
          rating: 0,
          reviews: 0,
          socialLinks: {
            linkedIn: "",
            instagram: "",
            website: "",
          },
        };

        await setDoc(userRef, newUser);
        return newUser;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (JPEG, PNG)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      setError("No file selected or user not found");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create a reference to the storage location
      const storageRef = ref(storage, `profilePictures/${user.id}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, selectedFile);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the user document with the photo URL
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        profilePicture: downloadURL,
      });

      // Update local state
      setProfilePicture(downloadURL);
      setShowUploadModal(false);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setError("Failed to upload profile picture");
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  const removeProfilePicture = async () => {
    if (!user) return;

    try {
      // Delete the file from storage
      if (user.profilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.id}`);
        await deleteObject(storageRef);
      }

      // Update the user document
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        profilePicture: null,
      });

      // Update local state
      setProfilePicture(null);
    } catch (error) {
      console.error("Error removing profile picture:", error);
      setError("Failed to remove profile picture");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.id);

      await updateDoc(userRef, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        location: formData.location,
        description: formData.description,
        socialLinks: {
          linkedIn: formData.linkedIn,
          instagram: formData.instagram,
          website: formData.website,
        },
      });

      // Update local state
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        location: formData.location,
        description: formData.description,
        socialLinks: {
          linkedIn: formData.linkedIn,
          instagram: formData.instagram,
          website: formData.website,
        },
      };

      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (authLoading || !authUser?.uid) return;

      try {
        const userData = await fetchUserData(authUser.uid);
        setUser(userData);

        // Set form data from Firestore
        setFormData({
          name: userData.name,
          email: userData.email || "",
          role: userData.role,
          location: userData.location,
          description: userData.description,
          linkedIn: userData.socialLinks?.linkedIn || "",
          instagram: userData.socialLinks?.instagram || "",
          website: userData.socialLinks?.website || "",
        });

        // Set profile picture if it exists in Firestore
        if (userData.profilePicture) {
          setProfilePicture(userData.profilePicture);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authUser, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-700">No user data available</p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {user.name ? `${user.name}'s Profile` : "Your Profile"}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Profile Header */}
          <div className="bg-green-600 h-32 relative"></div>

          <div className="md:flex">
            {/* Profile Picture Section */}
            <div className="md:w-1/4 p-8 bg-gray-50 border-r border-gray-200 flex flex-col items-center relative">
              <div className="relative mb-6 group">
                <div className="absolute -top-20 w-32 h-32">
                  {profilePicture ? (
                    <>
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <img
                          src={profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {editMode && (
                        <button
                          onClick={removeProfilePicture}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove photo"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                      <FaUser className="text-gray-500 text-5xl" />
                    </div>
                  )}
                  {user.isVerified && (
                    <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
                      <FaCheckCircle className="text-green-600 text-lg" />
                    </div>
                  )}
                </div>

                <div className="mt-16">
                  {editMode && (
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="w-full px-4 py-2 mt-4 text-sm font-medium text-green-600 bg-white border border-green-600 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center"
                    >
                      <FileEdit className="mr-2" />
                      {profilePicture ? "Change Photo" : "Add Photo"}
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 w-full">
                <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">
                  Profile Info
                </h3>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center mb-3">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span>Member since {user.joinDate}</span>
                  </div>
                  {!editMode && formData.email && (
                    <div className="flex items-center mb-3">
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <span>{formData.email}</span>
                    </div>
                  )}
                  {!editMode && formData.location && (
                    <div className="flex items-center mb-3">
                      <MdLocationOn className="text-gray-400 mr-2" />
                      <span>{formData.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links Section - View Mode */}
              {!editMode && (
                <div className="w-full mt-6">
                  <h3 className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-3">
                    Connect
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.linkedIn && (
                      <a
                        href={formData.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-100 text-blue-800 p-2 rounded-md hover:bg-blue-200 transition-colors"
                      >
                        <FaLinkedin className="text-lg" />
                      </a>
                    )}
                    {formData.website && (
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-100 text-gray-800 p-2 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <FaGlobe className="text-lg" />
                      </a>
                    )}
                    {formData.instagram && (
                      <a
                        href={formData.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-pink-100 text-pink-800 p-2 rounded-md hover:bg-pink-200 transition-colors"
                      >
                        <FaInstagram className="text-lg" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Details Section */}
            <div className="md:w-3/4 p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  {editMode ? (
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {user.name || "Your Name"}
                      </h1>
                      {user.role && (
                        <p className="text-blue-600 font-medium mt-1">
                          {user.role}
                        </p>
                      )}
                    </>
                  )}
                </div>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center text-green-600 hover:text-green-800 bg-blue-50 px-4 py-2 rounded-md transition-colors"
                  >
                    <FileEdit className="mr-2" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              ) : null}

              {editMode ? (
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Profession/Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Agricultural Specialist"
                  />
                </div>
              ) : null}

              {editMode ? (
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. San Francisco, CA, USA"
                  />
                </div>
              ) : null}

              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Professional Summary
                </h2>
                {editMode ? (
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide a brief professional summary highlighting your experience and expertise..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {formData.description ||
                      "No professional summary provided."}
                  </p>
                )}
              </div>

              {/* Social Links Section - Edit Mode */}
              {editMode && (
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Professional Links
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="linkedIn"
                        className="flex items-center text-sm font-medium text-gray-700 mb-1"
                      >
                        <FaLinkedin className="mr-2 text-blue-600" />
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        id="linkedIn"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://www.linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="website"
                        className="flex items-center text-sm font-medium text-gray-700 mb-1"
                      >
                        <FaGlobe className="mr-2 text-gray-600" />
                        Website URL
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://www.yourdomain.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="instagram"
                        className="flex items-center text-sm font-medium text-gray-700 mb-1"
                      >
                        <FaInstagram className="mr-2 text-pink-600" />
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://www.instagram.com/yourusername"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Mode Actions */}
              {editMode && (
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        name: user.name,
                        email: user.email || "",
                        role: user.role,
                        location: user.location,
                        description: user.description,
                        linkedIn: user.socialLinks?.linkedIn || "",
                        instagram: user.socialLinks?.instagram || "",
                        website: user.socialLinks?.website || "",
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Profile Picture Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {profilePicture
                  ? "Update Profile Picture"
                  : "Upload Professional Photo"}
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setError(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="mb-6">
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border border-gray-200">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    For best results, use a professional headshot with good
                    lighting and a neutral background.
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FaUser className="mx-auto text-gray-400 text-4xl mb-3" />
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop your professional photo here, or click to
                    select
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Recommended: Square format, minimum 400x400 pixels
                  </p>
                  <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    Select Photo
                  </label>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setError(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`px-4 py-2 text-white rounded-md transition-colors ${
                  !selectedFile || uploading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {uploading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Upload Photo"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
