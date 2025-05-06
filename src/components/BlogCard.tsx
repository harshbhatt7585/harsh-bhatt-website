import Link from 'next/link';
import { FC } from 'react';
import { Post } from '@/app/lib/posts';

interface BlogCardProps {
  post: Post;
  category: 'technical-blog' | 'personal-essay';
}

const BlogCard: FC<BlogCardProps> = ({ post, category }) => {
  return (
    <Link
      href={`/${category}/${post.slug}`}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600">{new Date(post.date).toLocaleDateString()}</p>
    </Link>
  );
};

export default BlogCard;
