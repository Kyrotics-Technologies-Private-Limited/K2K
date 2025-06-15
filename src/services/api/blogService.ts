import { Blog } from '../../types/blog';
import { sampleBlogs } from '../../mockData/SampleBlogs';

const BASE_URL = '/api/blogs'; // Replace with your actual API endpoint when backend is ready

export const blogService = {
  // Get all blogs with optional category filter
  async getBlogs(category?: string): Promise<Blog[]> {
    // In development, return the sample data
    if (process.env.NODE_ENV === 'development') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (category && category !== 'all') {
        return sampleBlogs.filter(blog => blog.category === category);
      }
      return sampleBlogs;
    }

    // In production, use the API
    const url = category && category !== 'all'
      ? `${BASE_URL}?category=${category}`
      : BASE_URL;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },
  // Get a single blog by ID
  async getBlogById(id: string): Promise<Blog> {
    // In development, return from sample data
    if (process.env.NODE_ENV === 'development') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const blog = sampleBlogs.find(b => b.id === id);
      if (!blog) throw new Error('Blog not found');
      return blog;
    }

    // In production, use the API
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  }
};
