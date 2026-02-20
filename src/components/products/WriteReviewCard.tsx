import React, { useState } from "react";
import { Star, Upload, X } from "lucide-react";
import { toast } from "react-toastify";
import { reviewApi } from "../../services/api/reviewApi";
import { storage } from "../../services/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface WriteReviewCardProps {
  productId: string;
  isLoggedIn: boolean;
  onSuccess?: () => void;
  onLoginClick?: () => void;
}

export const WriteReviewCard: React.FC<WriteReviewCardProps> = ({
  productId,
  isLoggedIn,
  onSuccess,
  onLoginClick,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length + selectedImages.length > 3) {
        setError("You can upload a maximum of 3 images.");
        return;
      }
      setSelectedImages((prev) => [...prev, ...filesArray]);
      setError(null);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    setUploadingImages(true);
    const urls: string[] = [];

    try {
      for (const file of selectedImages) {
        const timestamp = Date.now();
        const storageRef = ref(storage, `reviews/${productId}/${timestamp}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
      }
    } catch (err) {
      console.error("Error uploading images:", err);
      throw new Error("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
    }

    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      onLoginClick?.();
      return;
    }
    if (rating < 1 || rating > 5) {
      setError("Please select a rating (1–5 stars).");
      return;
    }
    const trimmed = comment.trim();
    // Removed mandatory comment check

    setError(null);
    setSubmitting(true);
    try {
      const photoUrls = await uploadImages();

      await reviewApi.createReview({
        productId,
        rating,
        comment: trimmed,
        photos: photoUrls,
      });
      toast.success("Thank you! Your review has been posted.");
      setRating(0);
      setComment("");
      setSelectedImages([]);
      setHoverRating(0);
      onSuccess?.();
    } catch (err: any) {
      const msg =
        err.response?.data?.error || "Failed to submit review. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 text-center">
        <p className="text-gray-700 font-medium mb-2">Want to leave a review?</p>
        <p className="text-sm text-gray-500 mb-4">
          Sign in to share your experience and help other customers decide.
        </p>
        <button
          type="button"
          onClick={onLoginClick}
          className="px-5 py-2.5 bg-green-800 text-white font-medium rounded-xl hover:bg-green-900 transition-colors"
        >
          Sign in to review
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Write a review</h3>
      <p className="text-sm text-gray-500 mb-6">
        Share your experience with this product. Your review helps other customers.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating)
                    ? "fill-amber-400 stroke-amber-400"
                    : "stroke-gray-300 fill-transparent"
                    }`}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {(hoverRating || rating) > 0 &&
              (hoverRating || rating) === 1 && "Poor"}
            {(hoverRating || rating) === 2 && "Fair"}
            {(hoverRating || rating) === 3 && "Good"}
            {(hoverRating || rating) === 4 && "Very good"}
            {(hoverRating || rating) === 5 && "Excellent"}
          </p>
        </div>
        <div>
          <label
            htmlFor="review-comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your review <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike? Would you recommend this product?"
            rows={4}
            maxLength={1000}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1 text-right">
            {comment.length}/1000
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photos <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {selectedImages.map((file, index) => (
              <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {selectedImages.length < 3 && (
              <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-gray-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">Max 3 images.</p>
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting || rating < 1 || uploadingImages}
          className="px-6 py-3 bg-green-800 text-white font-medium rounded-xl hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[140px]"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit review"
          )}
        </button>
      </form>
    </div>
  );
};
