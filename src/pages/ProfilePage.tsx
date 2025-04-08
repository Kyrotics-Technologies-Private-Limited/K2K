import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaStar,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaCheckCircle,
  FaRegStar,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { FiEdit, FiDownload, FiActivity } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

interface UserProfile {
  id: string;
  name: string;
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

const fetchUserData = async (): Promise<UserProfile> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: "user123",
    name: "Risha Mondal",
    role: "Agricultural Specialist",
    location: "Nairobi, Kenya",
    joinDate: "January 2022",
    isVerified: true,
    description:
      "Passionate about sustainable farming practices and connecting with like-minded professionals in the agriculture industry. Open to collaborations and knowledge sharing.",
    rating: 4.8,
    reviews: 50,
    socialLinks: {
      linkedIn: "https://linkedin.com/in/johndoe-agro",
      instagram: "https://instagram.com/greenfields_agro",
      website: "https://www.greenfields.com",
    },
  };
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />
      ))}
      {hasHalfStar && (
        <FaStar key="half" className="text-yellow-400 opacity-50 text-sm" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
      ))}
      <span className="ml-1 text-gray-600 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        // Check if there's a stored profile picture in localStorage
        const storedPicture = localStorage.getItem("profilePicture");
        if (storedPicture) {
          setProfilePicture(storedPicture);
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setUploading(true);

    // Simulate upload process
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageUrl = event.target.result as string;
          setProfilePicture(imageUrl);
          // Store in localStorage for persistence
          localStorage.setItem("profilePicture", imageUrl);
          setShowUploadModal(false);
          setUploading(false);
          setSelectedFile(null);
        }
      };
      reader.readAsDataURL(selectedFile);
    }, 1500);
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    localStorage.removeItem("profilePicture");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            {/* Profile Picture Section */}
            <div className="md:w-1/4 p-8 bg-gray-50 border-r border-gray-200 flex flex-col items-center">
              <div className="relative mb-6 group">
                {profilePicture ? (
                  <>
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-inner">
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={removeProfilePicture}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove photo"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </>
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                    <FaUser className="text-gray-400 text-5xl" />
                  </div>
                )}
                {user.isVerified && (
                  <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-sm">
                    <FaCheckCircle className="text-green-500 text-lg" />
                  </div>
                )}
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Change Photo
                </button>
              </div>

              <div className="text-center">
                <RatingStars rating={user.rating} />
                <p className="text-sm text-gray-500 mt-1">
                  {user.reviews} reviews
                </p>
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="md:w-3/4 p-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-green-600 font-medium mt-1">{user.role}</p>
                <div className="flex items-center mt-2 text-gray-600">
                  <MdLocationOn className="mr-1 text-gray-500" />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  About
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {user.description}
                </p>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Member Since
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">{user.joinDate}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <FaStar className="mr-2 text-gray-400" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Rating
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {user.rating.toFixed(1)}/5.0
                  </p>
                </div>
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <FiActivity className="mr-2 text-gray-400" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      Status
                    </span>
                  </div>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
              </div>

              {/* Social Links */}
              {user.socialLinks && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Connect
                  </h2>
                  <div className="flex space-x-4">
                    {user.socialLinks.linkedIn && (
                      <a
                        href={user.socialLinks.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <FaLinkedin />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {user.socialLinks.instagram && (
                      <a
                        href={user.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-pink-50 hover:bg-pink-100 text-pink-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <FaInstagram />
                        <span>Instagram</span>
                      </a>
                    )}
                    {user.socialLinks.website && (
                      <a
                        href={user.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        <FaGlobe />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Profile Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              onClick={() => setShowUploadModal(true)}
            >
              <div className="bg-green-100 p-3 rounded-full mr-4 text-green-600">
                <FiEdit className="text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Edit Profile</h3>
                <p className="text-sm text-gray-500">
                  Update your personal information
                </p>
              </div>
            </button>

            <button className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600">
                <IoMdNotifications className="text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">
                  Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Manage your alert preferences
                </p>
              </div>
            </button>

            <button className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <div className="bg-purple-100 p-3 rounded-full mr-4 text-purple-600">
                <FiDownload className="text-lg" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Export Data</h3>
                <p className="text-sm text-gray-500">
                  Download your profile information
                </p>
              </div>
            </button>
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
                  ? "Change Profile Picture"
                  : "Upload Profile Picture"}
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-6">
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border border-gray-200">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {selectedFile.name}
                  </p>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FaUser className="mx-auto text-gray-400 text-4xl mb-3" />
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop your photo here, or click to select
                  </p>
                  <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md cursor-pointer hover:bg-green-700 transition-colors">
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
