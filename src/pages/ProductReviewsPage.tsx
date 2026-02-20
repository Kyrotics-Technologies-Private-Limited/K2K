import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "../types";
import { productApi } from "../services/api/productApi";
import { reviewApi, Review } from "../services/api/reviewApi";
import { Star, ArrowLeft, X } from "lucide-react";
import { useAuth, AuthProvider } from "../context/AuthContext";
import { WriteReviewCard } from "../components/products/WriteReviewCard";
import PhoneAuth from "../components/authComponents/PhoneAuth";

const ProductReviewsPageContent = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showWriteReview, setShowWriteReview] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const [productData, reviewsData] = await Promise.all([
                    productApi.getProductById(id),
                    reviewApi.getProductReviews(id)
                ]);
                setProduct(productData);
                setReviews(Array.isArray(reviewsData) ? reviewsData : []);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const fetchReviews = async () => {
        if (!id) return;
        try {
            const data = await reviewApi.getProductReviews(id);
            setReviews(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching reviews", err);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <p className="text-xl text-gray-600 mb-4">Product not found</p>
                <Link to="/all-products" className="text-green-800 font-medium hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    const actualRating =
        reviews.length > 0
            ? reviews.reduce((acc, r) => acc + (r?.rating || 0), 0) / reviews.length
            : product.ratings ?? 0;
    const reviewCount = reviews.length;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link
                        to={`/product/${product.id}`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-green-800 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to product</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Ratings Summary & Histogram */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                            <img src={product.images?.main || ""} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-4 border border-gray-200" />
                            <h2 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h2>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex text-yellow-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-6 h-6 ${i < Math.round(actualRating)
                                                ? "fill-yellow-400 stroke-yellow-400"
                                                : "fill-transparent stroke-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-medium text-gray-900">
                                    {actualRating > 0 ? actualRating.toFixed(1) : "0"} out of 5
                                </span>
                            </div>
                            <p className="text-gray-500 mb-6">{reviewCount} ratings</p>

                            {/* Histogram */}
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = reviews.filter((r) => r && Math.round(r.rating || 0) === star).length;
                                    const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
                                    return (
                                        <div key={star} className="flex items-center gap-3 text-sm">
                                            <span className="w-12 font-medium text-gray-600 hover:text-green-700 hover:underline cursor-pointer">
                                                {star} star
                                            </span>
                                            <div className="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                                                <div
                                                    className="h-full bg-yellow-400 border-r border-yellow-500"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="w-10 text-right text-gray-600">
                                                {Math.round(percentage)}%
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Review this product</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Share your thoughts with other customers
                            </p>
                            <button
                                onClick={() => setShowWriteReview(true)}
                                className="w-full bg-white border border-gray-300 text-gray-800 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Write a product review
                            </button>
                        </div> */}
                    </div>

                    {/* Right Column: Reviews List */}
                    <div className="lg:col-span-8">
                        {showWriteReview && (
                            <div className="mb-8 animate-fade-in">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">Write your review</h3>
                                    <button
                                        onClick={() => setShowWriteReview(false)}
                                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <WriteReviewCard
                                    productId={product.id}
                                    isLoggedIn={!!user}
                                    onSuccess={() => {
                                        fetchReviews();
                                        setShowWriteReview(false);
                                    }}
                                    onLoginClick={() => setShowLoginModal(true)}
                                />
                            </div>
                        )}

                        <h3 className="text-xl font-bold text-gray-900 mb-6">Top reviews from Customers</h3>

                        {reviews.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-gray-500">No reviews yet.</p>
                                <p className="text-sm text-gray-400 mt-1">Be the first to review this product!</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {reviews.map((review) => {
                                    if (!review) return null;
                                    return (
                                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                            {/* User Info */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    K2K Customer
                                                </span>
                                            </div>

                                            {/* Rating & Title */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex text-yellow-400">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating
                                                                ? "fill-yellow-400 stroke-yellow-400"
                                                                : "fill-transparent stroke-gray-300"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>

                                            </div>

                                            {/* Date & Verified */}
                                            <div className="text-sm text-gray-500 mb-3 space-x-2">
                                                <span>Reviewed on {(() => {
                                                    try {
                                                        return new Date(review.createdAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        });
                                                    } catch (e) {
                                                        return "Recent";
                                                    }
                                                })()}</span>
                                                <span className="text-gray-300">|</span>
                                                <span className="text-amber-700 font-medium">Verified Purchase</span>
                                            </div>

                                            {/* Comment */}
                                            {review.comment && (
                                                <p className="text-gray-800 leading-relaxed mb-4">
                                                    {review.comment}
                                                </p>
                                            )}

                                            {/* Photos */}
                                            {review.photos && review.photos.length > 0 && (
                                                <div className="flex gap-2 mb-4">
                                                    {review.photos.map((photo, index) => (
                                                        <img
                                                            key={index}
                                                            src={photo}
                                                            alt={`Review photo ${index + 1}`}
                                                            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showLoginModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4 sm:p-8">
                    <div className="relative bg-green-50 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-gray-100 animate-fade-in">
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-red-500"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-semibold text-green-700 text-center mb-4">
                            Login with Kishan2Kitchen
                        </h2>
                        <PhoneAuth />
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductReviewsPage = () => {
    return (
        <AuthProvider>
            <ProductReviewsPageContent />
        </AuthProvider>
    );
};

export default ProductReviewsPage;
