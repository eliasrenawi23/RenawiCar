"use client";

import React, { useEffect, useState } from "react";

const EditableCell: React.FC<{
  initialValue: string;
  rowIndex: number;
  columnId: string;
  updateData: (rowIndex: number, columnId: string, value: string) => void;
}> = ({ initialValue, rowIndex, columnId, updateData }) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onBlur = () => {
    setIsEditing(false);
    updateData(rowIndex, columnId, value);
  };

  useEffect(() => setValue(initialValue), [initialValue]);

  return isEditing ? (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      autoFocus
    />
  ) : (
    <div onDoubleClick={() => setIsEditing(true)}>{value}</div>
  );
};

export default EditableCell;
