'use client';

import { useQuery } from '@tanstack/react-query';
import { getAnalyticsOverview } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: getAnalyticsOverview,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading dashboard data. Please try again.
      </div>
    );
  }

  const statCards = [
    { label: 'Total Cars', value: stats?.total_cars || 0, icon: '🚗', color: 'bg-blue-500' },
    { label: 'Total Views', value: stats?.total_views || 0, icon: '👀', color: 'bg-green-500' },
    { label: 'Inquiries', value: stats?.total_inquiries || 0, icon: '📩', color: 'bg-purple-500' },
    { label: 'Sales', value: stats?.total_sales || 0, icon: '💰', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back to your admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10 text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/cars/new">
            <Card className="p-6 hover:border-primary-500 cursor-pointer transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                  ➕
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Add New Car</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">List a new vehicle for sale</p>
                </div>
              </div>
            </Card>
          </Link>
          
          <Link href="/admin/maintenance">
            <Card className="p-6 hover:border-primary-500 cursor-pointer transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                  🔧
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Log Maintenance</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Record service history</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/admin/inquiries">
            <Card className="p-6 hover:border-primary-500 cursor-pointer transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                  📩
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Check Inquiries</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">View new customer messages</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
