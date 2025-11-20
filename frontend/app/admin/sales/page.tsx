'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSales } from '@/lib/api';
import { Sale } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';
import { format } from 'date-fns';

export default function SalesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['sales'],
    queryFn: getSales,
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
        Error loading sales records. Please try again.
      </div>
    );
  }

  const totalRevenue = data?.results.reduce((sum: number, sale: Sale) => {
    return sum + parseFloat(sale.sale_price);
  }, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Records</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track completed vehicle sales</p>
        </div>
        <Link href="/admin/sales/new">
          <Button>
            <span className="mr-2">➕</span> Record New Sale
          </Button>
        </Link>
      </div>

      {/* Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {data?.results.length || 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-1">
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Sale Price</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              ${data?.results.length ? (totalRevenue / data.results.length).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
            </p>
          </div>
        </div>
      </Card>

      {/* Sales List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Car ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sale Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data?.results.map((sale: Sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {format(new Date(sale.sale_date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {sale.car.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {sale.customer_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      ${parseFloat(sale.sale_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    {sale.profit_margin !== null && sale.profit_margin !== undefined && (
                      <div className={`text-xs ${sale.profit_margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {sale.profit_margin >= 0 ? '+' : ''}{sale.profit_margin.toFixed(1)}% margin
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {sale.customer_email && (
                      <div className="truncate max-w-[200px]">{sale.customer_email}</div>
                    )}
                    {sale.customer_phone && (
                      <div>{sale.customer_phone}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.results.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No sales records found. Record your first sale to get started.
          </div>
        )}
      </Card>
    </div>
  );
}
