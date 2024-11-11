/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
// "use client";

// import React, { useState } from "react";
// import {
//   //ColumnDef,
//   SortingState,
//   // HeaderContext,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   useReactTable,
//   ColumnFiltersState,
//   getFilteredRowModel,
// } from "@tanstack/react-table";
// //import { ArrowUpDown } from "lucide-react";

// //import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { carData } from "@/lib/data/cars";
// import useColumns from "./useColumns";

// export default function SortableTable() {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [globalFilter, setGlobalFilter] = useState("");

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [data, setData] = useState(carData);
//   //const [originalData, setOriginalData] = useState(carData);
//   //const [isSaving, setIsSaving] = useState(false);

//   const updateData = (rowIndex: number, columnId: string, value: unknown) => {
//     setData((old) =>
//       old.map((row, index) => {
//         if (index === rowIndex) {
//           return {
//             ...old[rowIndex],
//             [columnId]: value,
//           };
//         }
//         return row;
//       })
//     );
//   };

//   const columns = useColumns({ updateData });

//   const table = useReactTable({
//     data: carData,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onGlobalFilterChange: setGlobalFilter,
//     state: {
//       sorting,
//       columnFilters,
//       globalFilter,
//     },
//     meta: {
//       updateData,
//     },
//   });

//   return (
//     <div className="space-y-4">
//       <input
//         placeholder="Search all columns..."
//         value={globalFilter ?? ""}
//         onChange={(event) => setGlobalFilter(String(event.target.value))}
//         className="max-w-sm"
//       />
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

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
  ColumnFiltersState,
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

interface SortableTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onSave: (data: TData[]) => Promise<void>;
}
export function SortableTable<TData, TValue>({
  columns: userColumns,
  data: initialData,
  onSave,
}: SortableTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const columns = useMemo(() => {
    return userColumns.map((column) => ({
      ...column,
      cell: (props: any) => {
        const initialValue = props.getValue();
        const [value, setValue] = useState(initialValue);
        const [isEditing, setIsEditing] = useState(false);

        const onBlur = () => {
          setIsEditing(false);
          props.table.options.meta?.updateData(
            props.row.index,
            props.column.id,
            value
          );
        };

        React.useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        if (isEditing) {
          return (
            <input
              value={value as string}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              autoFocus
            />
          );
        }

        return (
          <div onDoubleClick={() => setIsEditing(true)}>
            {column.cell ? column.cell(props) : (value as string)}
          </div>
        );
      },
    }));
  }, [userColumns]);

  //   const updateData = (rowIndex: number, columnId: string, value: unknown) => {
  //     setData((old) =>
  //       old.map((row, index) => {
  //         if (index === rowIndex) {
  //           return {
  //             ...old[rowIndex],
  //             [columnId]: value,
  //           };
  //         }
  //         return row;
  //       })
  //     );
  //   };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
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
      },
    },
  });

  const hasChanges = React.useMemo(() => {
    return JSON.stringify(data) !== JSON.stringify(originalData);
  }, [data, originalData]);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await onSave(data);
      setOriginalData(data);
      //   toast({
      //     title: "Changes saved",
      //     description: "Your changes have been successfully saved.",
      //   });
      console.log("Changes saved");
    } catch (error) {
      console.error("Failed to save changes:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to save changes. Please try again.",
      //     variant: "destructive",
      //   });
      console.log("error");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(event: { target: { value: any } }) =>
            setGlobalFilter(String(event.target.value))
          }
          className="max-w-sm"
        />
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
                {headerGroup.headers.map((header) => {
                  return (
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
