'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInquiries, updateInquiryStatus } from '@/lib/api';
import { Inquiry } from '@/types';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';

export default function InquiriesPage() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<string>('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['inquiries'],
    queryFn: getInquiries,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'new' | 'contacted' | 'closed' }) =>
      updateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });

  const handleStatusChange = async (id: number, newStatus: 'new' | 'contacted' | 'closed') => {
    await statusMutation.mutateAsync({ id, status: newStatus });
  };

  const filteredInquiries = data?.results.filter((inquiry: Inquiry) => {
    if (filter === 'all') return true;
    return inquiry.status === filter;
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
        Error loading inquiries. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inquiries</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage customer messages and leads</p>
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredInquiries?.map((inquiry: Inquiry) => (
          <Card key={inquiry.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {inquiry.name}
                  </h3>
                  <Badge
                    variant={
                      inquiry.status === 'new'
                        ? 'warning'
                        : inquiry.status === 'contacted'
                        ? 'info'
                        : 'default'
                    }
                  >
                    {inquiry.status.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {format(new Date(inquiry.created_at), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-4">
                  <a href={`mailto:${inquiry.email}`} className="hover:text-primary-600 flex items-center gap-1">
                    📧 {inquiry.email}
                  </a>
                  {inquiry.phone && (
                    <a href={`tel:${inquiry.phone}`} className="hover:text-primary-600 flex items-center gap-1">
                      📞 {inquiry.phone}
                    </a>
                  )}
                </div>

                {inquiry.car && (
                  <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    Interested in: Car ID #{inquiry.car} {/* TODO: Fetch car details if needed, or backend should expand this */}
                  </div>
                )}

                <p className="text-gray-700 dark:text-gray-300 mt-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  {inquiry.message}
                </p>
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-start md:justify-center min-w-[140px]">
                {inquiry.status === 'new' && (
                  <button
                    onClick={() => handleStatusChange(inquiry.id, 'contacted')}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors"
                  >
                    Mark Contacted
                  </button>
                )}
                {inquiry.status !== 'closed' && (
                  <button
                    onClick={() => handleStatusChange(inquiry.id, 'closed')}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                  >
                    Close Inquiry
                  </button>
                )}
                {inquiry.status === 'closed' && (
                  <button
                    onClick={() => handleStatusChange(inquiry.id, 'new')}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                  >
                    Reopen
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredInquiries?.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No inquiries found with status "{filter}".
          </div>
        )}
      </div>
    </div>
  );
}
