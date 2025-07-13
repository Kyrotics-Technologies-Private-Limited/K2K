import { Blog } from '../../types/blog';
import mockData from '../../mockData/blogs.json';

// Type assertion function to ensure blog data matches Blog type
const validateBlog = (blog: any): Blog => {
  // Validate category
  if (!['products', 'company', 'farming', 'health'].includes(blog.category)) {
    throw new Error(`Invalid category: ${blog.category}`);
  }
  
  return {
    ...blog,
    category: blog.category as Blog['category']
  };
};

export const blogService = {
  // Get all blogs with optional category filter
  async getBlogs(category?: string): Promise<Blog[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
      
    const blogs = mockData.blogs.map(validateBlog);
    
    if (category && category !== 'all') {
      return blogs.filter(blog => blog.category === category);
    }
    return blogs;
  },

  // Get a single blog by ID
  async getBlogById(id: string): Promise<Blog> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
      
    const blog = mockData.blogs.find(b => b.id === id);
    if (!blog) throw new Error('Blog not found');
    return validateBlog(blog);
  }
};
