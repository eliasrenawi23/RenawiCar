/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Car } from "@/lib/data/cars";

const useColumns = (): ColumnDef<Car>[] => {
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
