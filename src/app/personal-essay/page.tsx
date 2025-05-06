import Nav from '@/components/Nav';
import { FC } from 'react';

const PersonalEssay: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Personal Essay</h1>
        <p className="text-lg text-gray-600">
          Reflections and personal stories. (Coming soon!)
        </p>
      </main>
    </div>
  );
};

export default PersonalEssay;