import React, { useState, useEffect } from "react";
import {
  FileEdit,
  Save,
  User as UserIcon,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { db, storage } from "../../services/firebase/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// User interface
export interface User {
  uid: string;
  name: string;
  email: string | null;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  profilePicture?: string;
}

const UserProfilePage: React.FC = () => {
  //const dispatch = useDispatch();
  const { user: authUser, loading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchUserData = async (uid: string): Promise<User> => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return {
          uid: docSnap.id,
          ...docSnap.data(),
        } as User;
      } else {
        // Create a new user document if it doesn't exist
        const newUser: User = {
          uid,
          name: authUser?.name || "",
          email: authUser?.email || null,
          phone: authUser?.phone || "",
          createdAt: new Date(),
          updatedAt: new Date(),
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
      const storageRef = ref(storage, `profilePictures/${user.uid}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, selectedFile);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the user document with the photo URL
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profilePicture: downloadURL,
        updatedAt: new Date(),
      });

      // Update local state
      setProfilePicture(downloadURL);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setError("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  const removeProfilePicture = async () => {
    if (!user) return;

    try {
      // Delete the file from storage
      if (user.profilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await deleteObject(storageRef);
      }

      // Update the user document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profilePicture: null,
        updatedAt: new Date(),
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

    // For name field, only allow alphabets and spaces
    if (name === "name") {
      const cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    }
    // For phone field, only allow numeric input and handle +91 prefix
    else if (name === "phone") {
      // Remove any non-numeric characters except '+'
      const cleanedValue = value.replace(/[^\d+]/g, "");

      // Handle the +91 prefix
      let formattedValue = cleanedValue;
      if (!cleanedValue.startsWith("+91")) {
        // If input doesn't start with +91, remove any + if present
        const numericOnly = cleanedValue.replace(/\+/g, "");
        // Only add +91 if there are numbers
        formattedValue = numericOnly ? `+91${numericOnly}` : "";
      }

      // Limit the total length to 13 characters (+91 plus 10 digits)
      formattedValue = formattedValue.slice(0, 13);

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setError(null);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        updatedAt: new Date(),
      });

      // Update local state
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        updatedAt: new Date(),
      });

      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile information");
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
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {user.name ? `${user.name}'s Profile` : "Your Profile"}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-green-600 h-24 relative"></div>

          <div className="flex flex-col md:flex-row">
            {/* Profile Picture Section */}
            <div className="md:w-1/3 p-6 bg-gray-50 border-r border-gray-200 flex flex-col items-center relative">
              <div className="relative mb-6 group">
                <div className="absolute -top-16 w-32 h-32">
                  {profilePicture ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:opacity-90 transition-opacity">
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      {editMode && (
                        <button
                          onClick={removeProfilePicture}
                          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove photo"
                        >
                          <span className="text-xs">×</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                      <UserIcon className="text-gray-500 h-16 w-16" />
                    </div>
                  )}
                </div>

                <div className="mt-16">
                  {editMode && (
                    <div className="mt-2">
                      <input
                        type="file"
                        id="profile-picture"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor="profile-picture"
                        className="cursor-pointer inline-block w-full px-4 py-2 text-sm font-medium text-center text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50 transition-colors"
                      >
                        {profilePicture ? "Change Photo" : "Add Photo"}
                      </label>

                      {selectedFile && (
                        <button
                          onClick={handleUpload}
                          disabled={uploading}
                          className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-300 transition-colors"
                        >
                          {uploading ? "Uploading..." : "Upload"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 w-full text-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {formData.name || "Your Name"}
                </h2>

                {user.createdAt && (
                  <div className="flex items-center justify-center mt-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {/* <span>Joined new Date({user.createdAt})</span> */}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Account Information
                </h3>

                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center text-green-600 hover:text-green-800 bg-green-50 px-3 py-1.5 rounded-md text-sm transition-colors"
                  >
                    <FileEdit className="w-4 h-4 mr-1" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md text-sm transition-colors"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    <span>Save</span>
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="+91 Enter your 10-digit number"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center py-2 border-b border-gray-100">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-gray-800">
                        {user.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center py-2 border-b border-gray-100">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-gray-800">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {user.updatedAt && (
                    <div className="flex items-center py-2">
                      <div>
                        <p className="text-xs text-gray-500">Last updated</p>
                        <p className="text-gray-500 text-sm">
                          {/* {user.updatedAt} */}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
