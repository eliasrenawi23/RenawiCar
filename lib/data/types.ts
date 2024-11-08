// types/TableRowData.ts

export interface TableRowData {
  id: string; // Unique identifier for each row
  [key: string]: string | number | boolean; // Allows flexible columns with various data types
}
