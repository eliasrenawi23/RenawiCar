"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  HeaderContext,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Car, carData } from "@/lib/data/cars";

const renderSortableHeader = (
  title: string,
  column: HeaderContext<Car, unknown>["column"]
) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "make",
    header: ({ column }) => renderSortableHeader("Make", column),
  },
  {
    accessorKey: "model",
    header: ({ column }) => renderSortableHeader("Model", column),
  },
  {
    accessorKey: "year",
    header: ({ column }) => renderSortableHeader("Year", column),
  },
  {
    accessorKey: "color",
    header: ({ column }) => renderSortableHeader("Color", column),
  },
  {
    accessorKey: "price",
    header: ({ column }) => renderSortableHeader("Price", column),
  },
  {
    accessorKey: "mileage",
    header: ({ column }) => renderSortableHeader("Mileage", column),
  },
  {
    accessorKey: "purchasePrice",
    header: ({ column }) => renderSortableHeader("Purchase Price", column),
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => renderSortableHeader("Selling Price", column),
  },
  {
    accessorKey: "profit",
    header: ({ column }) => renderSortableHeader("Profit", column),
  },
];

export default function SortableTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: carData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
