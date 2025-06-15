import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Blog } from '../types/blog';
import { blogService } from '../services/api/blogService';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { sampleBlogs } from '../mockData/SampleBlogs';

const BlogDetailPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await blogService.getBlogById(blogId);
        setBlog(data);
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        // Fallback to sample data in development
        if (process.env.NODE_ENV === 'development') {
          setBlog(sampleBlogs.find(b => b.id === blogId) || null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <button
          onClick={() => navigate('/Blog')}
          className="button flex items-center gap-2 mb-4 text-gray-600 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Blog
        </button>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-2">
          {error || 'Blog post not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <button
        onClick={() => navigate('/Blog')}
        className="flex items-center gap-2 mb-4 text-gray-600 hover:text-green-600 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Blog
      </button>

      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-[400px] object-cover rounded-lg"
      />

      <div className="mt-8">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-4">
          {blog.category}
        </span>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            {blog.author.avatar && (
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <div className="font-medium text-gray-900">{blog.author.name}</div>
              <div className="text-sm text-gray-500">
                {new Date(blog.publishedAt).toLocaleDateString()} · {blog.readTime}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />        <div 
          className="blog-content prose prose-lg prose-green max-w-none mx-auto prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-800 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-gray-800 prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <hr className="my-8 border-gray-200" />

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
