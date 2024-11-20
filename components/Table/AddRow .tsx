import { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";

interface Column {
  accessorKey: string; // Adjusted to lowercase `string` for correct typing
  header: string;
}

interface AddRowProps<TData> {
  data: TData[];
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
  //columns: ColumnDef<TData, TValue>[];
  columns: {
    accessorKey: string;
    header: string;
  }[];
}

export const AddRow = <TData,>({
  data,
  setData,
  columns,
}: AddRowProps<TData>) => {
  const defaultNewRow: TData = columns.reduce(
    (acc, column) => ({
      ...acc,
      [column.accessorKey]: "", // Ensure default value for each column
    }),
    {} as TData
  );

  const [newRow, setNewRow] = useState<TData>(defaultNewRow);

  const handleAddRow = () => {
    // Validate that all fields have been filled before adding the row
    const isAnyFieldEmpty = columns.some((column) => {
      const value = newRow[column.accessorKey as keyof TData];
      return !value || value.toString().trim() === "";
    });

    if (isAnyFieldEmpty) {
      alert("Please fill all fields before adding the row.");
      return;
    }

    // Generate a new `id` for the row
    const newId =
      Math.max(0, ...data.map((row) => (row as { id?: number }).id || 0)) + 1;

    // Add the new row to the data and reset the input fields
    setData((prev) => [
      ...prev,
      { id: newId, ...newRow } as TData, // Ensure new row includes `id`
    ]);
    setNewRow(defaultNewRow); // Reset to default values
  };
  return (
    <>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.accessorKey}>
            <input
              placeholder={column.header}
              name={column.accessorKey}
              value={String(newRow[column.accessorKey as keyof TData]) || ""}
              onChange={(e) =>
                setNewRow((prev) => ({
                  ...prev,
                  [column.accessorKey]: e.target.value, // Update the specific field
                }))
              }
              className="w-full border rounded px-2 py-1"
            />
          </TableCell>
        ))}
      </TableRow>
      <TableCell className="text-right">
        <Button onClick={handleAddRow}>Add Row</Button>
      </TableCell>
    </>
  );
};
