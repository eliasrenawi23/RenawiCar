"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditableCell from "./EditableCell";
import DropDown from "../DropDown/DropDown";

interface SortableTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSave?: (data: TData[]) => Promise<void>;
  enableSearch?: boolean;
  enableColumnFilter?: boolean;
  enablePagination?: boolean;
}

const SortableTable = <TData, TValue>({
  columns: userColumns,
  data: initialData,
  onSave,
  enableSearch = true,
  enableColumnFilter = true,
  enablePagination = true,
}: SortableTableProps<TData, TValue>) => {
  const [data, setData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo(() => {
    const updateData = (rowIndex: number, columnId: string, value: unknown) => {
      setData((prevData) =>
        prevData.map((row, index) =>
          index === rowIndex ? { ...row, [columnId]: value } : row
        )
      );
    };
    return userColumns.map((column) => ({
      ...column,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: (props: any) => (
        <EditableCell
          value={props.getValue()}
          rowIndex={props.row.index}
          columnId={props.column.id}
          updateData={updateData}
          options={props.column.columnDef.options}
          // options={
          //   props.column.id === "options"
          //     ? props.row.original.options
          //     : undefined
          // }
        />
      ),
    }));
  }, [userColumns]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, globalFilter, columnVisibility },
  });

  const hasChanges = useMemo(
    () => JSON.stringify(data) !== JSON.stringify(originalData),
    [data, originalData]
  );

  const handleSaveChanges = async () => {
    setIsSaving(true);
    if (onSave)
      try {
        await onSave(data);
        setOriginalData(data);
        console.log("Changes saved");
      } catch (error) {
        console.error("Failed to save changes:", error);
      } finally {
        setIsSaving(false);
      }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {enableSearch && (
          <input
            placeholder="Search all columns..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
        )}
        {enableColumnFilter && (
          <DropDown
            initialValue="Columns"
            options={table
              .getAllColumns()
              .filter((column) => column.getCanHide())}
            checkboxOptions={table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => ({
                id: column.id,
                label: column.id,
                checked: column.getIsVisible(),
                onCheckedChange: (value: boolean) =>
                  column.toggleVisibility(!!value),
              }))}
            handleOptionSelect={(option) => console.log(option)} // Make sure to define `handleOptionSelect`
            buttonLabel="Columns"
          />
        )}
        {hasChanges && (
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <Button
                        variant="ghost"
                        onClick={() =>
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc"
                          )
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
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
        {enablePagination && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortableTable;
