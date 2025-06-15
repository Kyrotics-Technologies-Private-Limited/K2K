export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: 'products' | 'company' | 'farming' | 'health';
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
}
