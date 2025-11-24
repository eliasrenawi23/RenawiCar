'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllMaintenanceRecords, deleteMaintenanceRecord } from '@/lib/api';
import { MaintenanceRecord } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';
import { format } from 'date-fns';

export default function MaintenancePage() {
  const queryClient = useQueryClient();

  const { data: records, isLoading, error } = useQuery({
    queryKey: ['maintenance-all'],
    queryFn: getAllMaintenanceRecords,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMaintenanceRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-all'] });
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this maintenance record?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

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
        Error loading maintenance records. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Maintenance Records</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track vehicle service history</p>
        </div>
        <Link href="/admin/maintenance/new">
          <Button>
            <span className="mr-2">➕</span> Add Maintenance Record
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {records?.results?.map((record: MaintenanceRecord) => (
          <Card key={record.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Car ID: {record.car}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {format(new Date(record.repair_date), 'MMM d, yyyy')}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300">{record.description}</p>

                {record.parts && record.parts.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Parts Used:
                    </h4>
                    <div className="space-y-1">
                      {record.parts.map((part) => (
                        <div
                          key={part.id}
                          className="text-sm text-gray-600 dark:text-gray-400 flex justify-between bg-gray-50 dark:bg-gray-800/50 p-2 rounded"
                        >
                          <span>
                            {part.part_name} (x{part.quantity})
                          </span>
                          <span className="font-medium">${parseFloat(part.total_cost).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mt-2">
                  Total Cost: ${parseFloat(record.total_cost).toFixed(2)}
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-start md:justify-center min-w-[140px]">
                <Link href={`/admin/maintenance/${record.id}`} className="flex-1 md:flex-none">
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(record.id)}
                  className="flex-1 md:flex-none text-red-600 hover:text-red-700 hover:border-red-600"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {records?.results?.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No maintenance records found. Add your first record to get started.
          </div>
        )}
      </div>
    </div>
  );
}
