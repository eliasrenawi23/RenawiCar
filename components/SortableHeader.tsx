/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { HeaderContext } from "@tanstack/react-table";

interface SortableHeaderProps {
  title: string;
  column: HeaderContext<any, unknown>["column"];
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ title, column }) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {title}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export default SortableHeader;
