import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex';
import { Post } from '@/app/lib/posts';
import Link from 'next/link';
import 'katex/dist/katex.min.css';

interface PostPageProps {
  post: Post;
}

const PostPage: FC<PostPageProps> = ({ post }) => {
  return (
    <article className="prose prose-lg font-sans max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          a: ({ href, children }) => (
            <Link href={href || '#'}>
              <a className="text-blue-600 underline hover:text-blue-800 transition">
                {children}
              </a>
            </Link>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">
              {children}
            </h2>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostPage;