/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from "react";
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { ColumnDef, HeaderContext } from "@tanstack/react-table";
// import SortableHeader from "./SortableHeader";
// import EditableCell from "./EditableCell";

// function useColumns<T extends object>(
//   keys: Array<keyof T>,
//   updateData: (rowIndex: number, columnId: string, value: unknown) => void
// ): ColumnDef<T>[] {
//   return keys.map((key) => ({
//     accessorKey: key as string,
//     header: ({ column }) => (
//       <SortableHeader
//         title={String(key).charAt(0).toUpperCase() + String(key).slice(1)}
//         column={column}
//       />
//     ),
//     cell: ({ row, column }) => (
//       <EditableCell
//         initialValue={row.getValue(key as string) as string}
//         rowIndex={row.index}
//         columnId={column.id}
//         updateData={updateData}
//       />
//     ),
//   }));
// }

// export default useColumns;

import React, { useMemo } from "react";
import EditableCell from "./EditableCell";
import SortableHeader from "./SortableHeader";
import { ColumnDef } from "@tanstack/react-table";
import { Car } from "@/lib/data/cars";

interface ColumnsProps {
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
}

// const useColumns = ({ updateData }: ColumnsProps): ColumnDef<Car>[] => {
//   const columns = useMemo<ColumnDef<Car>[]>(
//     () => [
//       {
//         accessorKey: "make",
//         header: ({ column }) => <SortableHeader title="Make" column={column} />,
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("make") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "model",
//         header: ({ column }) => (
//           <SortableHeader title="Model" column={column} />
//         ),
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("model") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "year",
//         header: ({ column }) => <SortableHeader title="Year" column={column} />,
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("year") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "color",
//         header: ({ column }) => (
//           <SortableHeader title="Color" column={column} />
//         ),
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("color") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "price",
//         header: ({ column }) => (
//           <SortableHeader title="Price" column={column} />
//         ),
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("price") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "mileage",
//         header: ({ column }) => (
//           <SortableHeader title="Mileage" column={column} />
//         ),
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("mileage") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "purchasePrice",
//         header: ({ column }) => (
//           <SortableHeader title="Purchase Price" column={column} />
//         ),
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("purchasePrice") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "sellingPrice",
//         header: ({ column }) => (
//           <SortableHeader title="Selling Price" column={column} />
//         ),
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("sellingPrice") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//       {
//         accessorKey: "profit",
//         header: ({ column }) => (
//           <SortableHeader title="Profit" column={column} />
//         ),
//         cell: ({ row, column }) => (
//           <EditableCell
//             initialValue={row.getValue("profit") as string}
//             rowIndex={row.index}
//             columnId={column.id}
//             updateData={updateData}
//           />
//         ),
//       },
//     ],
//     []
//   );
//   return columns;
// };

const useColumns = ({ updateData }: ColumnsProps): ColumnDef<Car>[] => {
  const columns = useMemo<ColumnDef<Car>[]>(
    () => [
      {
        accessorKey: "make",
        header: "Make",
      },
      {
        accessorKey: "model",
        header: "Model",
      },
      {
        accessorKey: "year",
        header: "Year",
      },
      {
        accessorKey: "color",
        header: "Color",
      },
      {
        accessorKey: "price",
        header: "Price",
      },
      {
        accessorKey: "mileage",
        header: "Mileage",
      },
      {
        accessorKey: "purchasePrice",
        header: "Purchase Price",
      },
      {
        accessorKey: "sellingPrice",
        header: "Selling Price",
      },
      {
        accessorKey: "profit",
        header: "Profit",
      },
    ],
    []
  );
  return columns;
};

export default useColumns;
