// app/technical-blog/page.tsx
import Nav from '@/components/Nav';
import BlogCard from '@/components/BlogCard';
import { getPosts } from '@/app/lib/posts';

export default async function TechnicalBlog() {
  const posts = await getPosts('technical-blog');

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Nav />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">Technical Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard key={post.slug} post={post} category="technical-blog" />
            ))
          ) : (
            <p className="text-lg">No posts available yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
