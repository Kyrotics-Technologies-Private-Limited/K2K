import React, { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { reviewApi } from "../../services/api/reviewApi";
import { setReviewPromptDismissed } from "../../lib/deliveredOrderReview";

export interface ProductToReview {
  productId: string;
  name?: string;
  image?: string;
}

export interface DeliveredOrderReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productsToReview: ProductToReview[];
  onReviewSubmitted?: (productId: string) => void;
}

export const DeliveredOrderReviewModal: React.FC<
  DeliveredOrderReviewModalProps
> = ({ open, onOpenChange, productsToReview, onReviewSubmitted }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = productsToReview[currentIndex];
  const hasMore = currentIndex < productsToReview.length - 1;
  const total = productsToReview.length;

  const resetForm = () => {
    setRating(0);
    setComment("");
    setHoverRating(0);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!current) return;
    if (rating < 1 || rating > 5) {
      setError("Please select a rating (1–5 stars).");
      return;
    }
    const trimmed = comment.trim();
    if (!trimmed) {
      setError("Please write your review.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await reviewApi.createReview({
        productId: current.productId,
        rating,
        comment: trimmed,
      });
      toast.success("Thank you! Your review has been posted.");
      onReviewSubmitted?.(current.productId);
      resetForm();
      if (hasMore) {
        setCurrentIndex(0);
      } else {
        onOpenChange(false);
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data
          ?.error || "Failed to submit review. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemindLater = () => {
    setReviewPromptDismissed();
    onOpenChange(false);
    resetForm();
    setCurrentIndex(0);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      resetForm();
      setCurrentIndex(0);
    }
    onOpenChange(next);
  };

  if (!current) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How was your purchase?</DialogTitle>
          <DialogDescription>
            Your feedback helps other customers. Rate this product from your
            delivered order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current product */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3">
            {current.image ? (
              <img
                src={current.image}
                alt={current.name ?? "Product"}
                className="h-14 w-14 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-500">
                No image
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900">
                {current.name ?? "Product"}
              </p>
              {total > 1 && (
                <p className="text-xs text-gray-500">
                  Product {currentIndex + 1} of {total}
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
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
                    className="rounded-full p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 stroke-amber-400"
                          : "stroke-gray-300 fill-transparent"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {(hoverRating || rating) > 0 &&
                  (hoverRating || rating) === 1 &&
                  "Poor"}
                {(hoverRating || rating) === 2 && "Fair"}
                {(hoverRating || rating) === 3 && "Good"}
                {(hoverRating || rating) === 4 && "Very good"}
                {(hoverRating || rating) === 5 && "Excellent"}
              </p>
            </div>
            <div>
              <label
                htmlFor="modal-review-comment"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Your review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="modal-review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike? Would you recommend this product?"
                rows={3}
                maxLength={1000}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="mt-1 text-right text-xs text-gray-500">
                {comment.length}/1000
              </p>
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <DialogFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:items-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleRemindLater}
                className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                Remind later
              </Button>
              <Button
                type="submit"
                disabled={submitting || rating < 1 || !comment.trim()}
                className="w-full sm:w-auto bg-green-800 hover:bg-green-900"
              >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit review"
                  )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
