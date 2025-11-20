'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { logout } from '@/lib/api';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    // Also clear the cookie
    document.cookie = 'admin_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
      <div className="md:hidden">
        {/* Mobile menu trigger would go here */}
        <span className="font-bold text-lg">RenawiAdmin</span>
      </div>
      
      <div className="flex items-center gap-4 ml-auto">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Administrator
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-900/20"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
