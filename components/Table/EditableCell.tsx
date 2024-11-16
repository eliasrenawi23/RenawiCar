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
import DropDown from "../DropDown/DropDown";

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
    <DropDown
      initialValue={initialValue}
      options={options}
      handleOptionSelect={handleOptionSelect}
    />
  ) : (
    <div onClick={() => setIsEditing(true)}>{String(value)}</div>
  );
};

export default EditableCell;
