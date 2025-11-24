'use client';

import { useQuery } from '@tanstack/react-query';
import { getAnalyticsOverview } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Car
} from 'lucide-react';

export default function AnalyticsPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['admin-analytics'],
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
        Error loading analytics data. Please try again.
      </div>
    );
  }

  // Calculate max value for scaling charts
  const maxRevenue = stats?.sales_trend?.reduce((max, item) => Math.max(max, item.revenue), 0) || 100000;
  const maxSales = stats?.sales_trend?.reduce((max, item) => Math.max(max, item.sales), 0) || 10;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Detailed insights into your dealership's performance.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${stats?.total_revenue_this_month?.toLocaleString() || '0'}
              </h3>
              <div className="flex items-center mt-2 text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Sales</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {stats?.cars_sold_this_month || 0}
              </h3>
              <div className="flex items-center mt-2 text-blue-600 text-sm">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                <span>+4 sales from last month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Inquiries</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {stats?.pending_inquiries || 0}
              </h3>
              <div className="flex items-center mt-2 text-orange-600 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Requires attention</span>
              </div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Views</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {stats?.total_views?.toLocaleString() || 0}
              </h3>
              <div className="flex items-center mt-2 text-gray-500 text-sm">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span>-2.4% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
              <Eye className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <Card className="p-6 border-0 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Trend</h3>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {stats?.sales_trend?.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full flex justify-center">
                  <div 
                    className="w-full max-w-[40px] bg-primary-500 rounded-t-sm transition-all duration-500 hover:bg-primary-600 group-hover:shadow-lg"
                    style={{ height: `${(item.revenue / maxRevenue) * 200}px` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                      ${item.revenue.toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2 truncate w-full text-center">{item.month}</span>
              </div>
            )) || (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No trend data available
              </div>
            )}
          </div>
        </Card>

        {/* Popular Cars */}
        <Card className="p-6 border-0 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Most Viewed Cars</h3>
          <div className="space-y-4">
            {stats?.popular_cars?.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                  {item.car.images?.[0] ? (
                    <img 
                      src={item.car.images[0].image_url} 
                      alt={item.car.make} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Car className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.car.year} {item.car.make} {item.car.model}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ${parseFloat(item.car.price).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  <Eye className="w-4 h-4 mr-1 text-gray-400" />
                  {item.view_count}
                </div>
              </div>
            )) || (
              <div className="text-center text-gray-500 py-8">
                No popular cars data available
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Inquiries Table */}
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Inquiries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Car Interest</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent_inquiries?.map((inquiry) => (
                <tr key={inquiry.id} className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {inquiry.name}
                    <div className="text-xs text-gray-500 font-normal">{inquiry.email}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {inquiry.car ? 'Specific Vehicle' : 'General Inquiry'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                      ${inquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
                      ${inquiry.status === 'closed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                    `}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No recent inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
