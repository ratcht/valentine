'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const correctName = "Nouran"; // Replace with your girlfriend's name

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Case-insensitive comparison
    if (name.toLowerCase() === correctName.toLowerCase()) {
      setError('');
      router.push('/welcome');
    } else {
      setError("F off this isn't for you 🤣🤣");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            A lil' surprise fr
          </h1>
          <p className="text-gray-600">
            Enter your name!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 transition-all duration-300"
            />
            {error && (
              <p className="mt-2 text-red-500 text-sm animate-fade-in">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl text-lg font-medium transition-all duration-300"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}