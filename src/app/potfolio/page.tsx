import Nav from '@/components/Nav';
import { FC } from 'react';

const Portfolio: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Portfolio</h1>
        <p className="text-lg text-gray-600">
          Showcase of my projects and work. (Coming soon!)
        </p>
      </main>
    </div>
  );
};

export default Portfolio;