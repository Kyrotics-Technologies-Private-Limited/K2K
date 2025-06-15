import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../types/blog';
import { blogService } from '../services/api/blogService';
import { Loader2 } from 'lucide-react';
import { sampleBlogs } from '../mockData/SampleBlogs';
import RecognizedBy from '@/components/homePageComponents/RecognizedBy';

const categories = [
  { value: 'all', label: 'All Posts' },
  { value: 'products', label: 'Products' },
  { value: 'company', label: 'Company' },
  { value: 'farming', label: 'Farming' },
  { value: 'health', label: 'Health' }
];

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await blogService.getBlogs(selectedCategory);
        setBlogs(data);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
        // Fallback to sample data in development
        if (process.env.NODE_ENV === 'development') {
          setBlogs(sampleBlogs);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  const filteredBlogs = selectedCategory === 'all'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <>
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Kishan2Kitchen Blogs
      </h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`button px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category.value
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (            <Link
              key={blog.id}
              to={`/Blog/${blog.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 block"
            >
              <div className="overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mb-3">
                  {blog.category}
                </span>
                <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-green-600 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t">
                  <div className="flex items-center gap-2">
                    {blog.author.avatar && (
                      <img
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <span className="text-sm text-gray-700">{blog.author.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{blog.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    <RecognizedBy/>
    </>
  );
};

export default BlogPage;
