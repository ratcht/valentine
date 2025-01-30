'use client';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';

export default function Welcome() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-12 animate-fade-in">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Hi My Love!!!
          </h1>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              I made this website because regular ass messages aren't enough to
              explain how much you mean to me. I hope you find this pretty cool
              because I think it is 🙄.
            </p>
            <p>
              You mean the world to me Nouran. You make me a better person every
              day we're together- and I genuinely cannot express how grateful I
              am for you. I love you so much. Now for a quiz...
            </p>
            <p className="text-pink-600 font-medium">
              I hope you studied fr...
            </p>
          </div>
        </div>
        
        <button
          onClick={() => router.push('/quiz')}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl text-lg font-medium transition-all duration-300 mt-6"
        >
          Let's Begin 😘
        </button>
      </div>
    </div>
  );
}