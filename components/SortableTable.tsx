"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  SortingState,
  HeaderContext,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
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
import EditableCell from "./EditableCell";

// const renderSortableHeader = (
//   title: string,
//   column: HeaderContext<Car, unknown>["column"]
// ) => (
//   <Button
//     variant="ghost"
//     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//   >
//     {title}
//     <ArrowUpDown className="ml-2 h-4 w-4" />
//   </Button>
// );

const SortableHeader: React.FC<{
  title: string;
  column: HeaderContext<Car, unknown>["column"];
}> = ({ title, column }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const createColumns = <T extends object>(
  keys: Array<keyof T>,
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
): ColumnDef<T>[] =>
  keys.map((key) => ({
    accessorKey: key as string,
    header: ({ column }) => (
      <SortableHeader
        title={String(key).charAt(0).toUpperCase() + String(key).slice(1)}
        column={column}
      />
    ),
    cell: ({ row, column }) => (
      <EditableCell
        initialValue={row.getValue(key as string) as string}
        rowIndex={row.index}
        columnId={column.id}
        updateData={updateData}
      />
    ),
  }));

// export const columns: ColumnDef<Car>[] = [
//   {
//     accessorKey: "make",
//     header: ({ column }) => renderSortableHeader("Make", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("make") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "model",
//     header: ({ column }) => renderSortableHeader("Model", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("model") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "year",
//     header: ({ column }) => renderSortableHeader("Year", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("year") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "color",
//     header: ({ column }) => renderSortableHeader("Color", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("color") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "price",
//     header: ({ column }) => renderSortableHeader("Price", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("price") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "mileage",
//     header: ({ column }) => renderSortableHeader("Mileage", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("mileage") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "purchasePrice",
//     header: ({ column }) => renderSortableHeader("Purchase Price", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("purchasePrice") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "sellingPrice",
//     header: ({ column }) => renderSortableHeader("Selling Price", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("sellingPrice") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
//   {
//     accessorKey: "profit",
//     header: ({ column }) => renderSortableHeader("Profit", column),
//     cell: ({ row, column, table }) => (
//       <EditableCell
//         initialValue={row.getValue("profit") as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={table.options.meta?.updateData}
//       />
//     ),
//   },
// ];

const carKeys: Array<keyof Car> = [
  "make",
  "model",
  "year",
  "color",
  "price",
  "mileage",
  "purchasePrice",
  "sellingPrice",
  "profit",
];

export default function SortableTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(carData);
  //const [originalData, setOriginalData] = useState(carData);
  //const [isSaving, setIsSaving] = useState(false);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns = createColumns<Car>(carKeys, updateData);

  const table = useReactTable({
    data: carData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    meta: {
      updateData,
    },
  });

  return (
    <div className="space-y-4">
      <input
        placeholder="Search all columns..."
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(String(event.target.value))}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
