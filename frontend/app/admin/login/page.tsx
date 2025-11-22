'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api';
import { setTokens } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useMutation({
    mutationFn: async () => {
      return await login(username, password);
    },
    onSuccess: (data) => {
      // Tokens are already set in the api.ts login function, but we can ensure it here too if we want to be explicit,
      // or just rely on the api.ts implementation which sets them.
      // Set cookie for middleware
      document.cookie = `admin_access_token=${data.access}; path=/; max-age=86400; SameSite=Strict`;
      router.push('/admin/dashboard');
    },
    onError: (err: any) => {
      setError('Invalid username or password');
      console.error('Login failed:', err);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/logo.png" 
              alt="RenawiCars Logo" 
              width={200}
              height={60}
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to manage your dealership</p>
        </div>

        <Card className="p-6 shadow-xl border-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={loginMutation.isPending}
            >
              Sign In
            </Button>
          </form>
        </Card>
        
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            &larr; Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
