import React, { useState, useEffect } from "react";

interface EditableCellProps<TValue> {
  value: TValue;
  rowIndex: number;
  columnId: string;
  updateData: (rowIndex: number, columnId: string, value: TValue) => void;
}

const EditableCell = <TValue,>({
  value: initialValue,
  rowIndex,
  columnId,
  updateData,
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

  return isEditing ? (
    <input
      value={value as unknown as string}
      onChange={(e) => setValue(e.target.value as unknown as TValue)}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <div onDoubleClick={() => setIsEditing(true)}>{String(value)}</div>
  );
};

export default EditableCell;
