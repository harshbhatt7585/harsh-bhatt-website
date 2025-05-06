// app/technical-blog/[slug]/page.tsx
import { getPosts, Post } from '@/app/lib/posts';
import PostPage from '@/components/PostPage';
import Nav from '@/components/Nav';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre‐generate all slugs at build time
export async function generateStaticParams() {
  const posts = await getPosts('technical-blog');
  return posts.map((post) => ({ slug: post.slug }));
}

// Make the component async and treat `params` as a promise
export default async function TechnicalBlogPost({
  params,
}: PageProps) {
  // await the params promise
  const { slug } = await params;

  // now slug is a string you can use normally
  const posts = await getPosts('technical-blog');
  const post = posts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Nav />
      <main className="container mx-auto py-12 px-4">
        <PostPage post={post} />
      </main>
    </div>
  );
}
