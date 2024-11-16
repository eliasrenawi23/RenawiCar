/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronDown, MoreHorizontal } from "lucide-react";

interface EditableCellProps<TValue> {
  value: TValue;
  rowIndex: number;
  columnId: string;
  updateData: (rowIndex: number, columnId: string, value: TValue) => void;
  options?: TValue[]; // Optional prop for dropdown values
}

const EditableCell = <TValue,>({
  value: initialValue,
  rowIndex,
  columnId,
  updateData,
  options,
}: EditableCellProps<TValue>) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    updateData(rowIndex, columnId, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleOptionSelect = (selectedValue: TValue) => {
    setValue(selectedValue);
    updateData(rowIndex, columnId, selectedValue);
    alert(`Selected: ${String(selectedValue)}`);
  };
  return isEditing ? (
    <input
      className="h-full w-full p-0 border-0 focus:ring-0"
      value={value as unknown as string}
      onChange={(e) => setValue(e.target.value as unknown as TValue)}
      onBlur={handleBlur}
      autoFocus
    />
  ) : options ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          {String(initialValue || "")} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border border-gray-200 rounded-md p-2 shadow-lg bg-white min-w-[180px]"
      >
        <DropdownMenuLabel className="px-2 py-1 text-sm font-semibold text-gray-700">
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 border-gray-300" />

        {Array.isArray(options) &&
          options.map((option) => (
            <DropdownMenuItem
              className="px-2 py-1 rounded-md hover:bg-gray-100 text-sm text-gray-800 cursor-pointer focus:outline-none"
              key={String(option)}
              onClick={() => handleOptionSelect(option)}
            >
              {String(option)}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div onClick={() => setIsEditing(true)}>{String(value)}</div>
  );
};

export default EditableCell;
