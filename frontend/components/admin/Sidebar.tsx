'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Cars', href: '/admin/cars', icon: '🚗' },
  { name: 'Maintenance', href: '/admin/maintenance', icon: '🔧' },
  { name: 'Inquiries', href: '/admin/inquiries', icon: '📩' },
  { name: 'Sales', href: '/admin/sales', icon: '💰' },
  { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col h-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">RenawiAdmin</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <span>🏠</span>
          <span>View Website</span>
        </Link>
      </div>
    </aside>
  );
}
