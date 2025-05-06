import Link from 'next/link';
import { FC } from 'react';

const Nav: FC = () => {
    return (
        <nav className="p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold hover:text-gray-800 transition">
                    Harsh Bhatt
                </Link>
                <div className="space-x-6">
                    <Link href="/portfolio" className="hover:text-gray-800 transition">
                        Portfolio
                    </Link>
                    <Link href="/technical-blog" className="hover:text-gray-800 transition">
                        Technical Blog
                    </Link>
                    <Link href="/personal-essay" className="hover:text-gray-800 transition">
                        Personal Essay
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;