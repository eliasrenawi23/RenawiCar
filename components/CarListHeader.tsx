// components/CarListHeader.tsx
"use client";

import React from "react";
import { useViewToggle } from "@/context/ViewToggleContext";

const CarListHeader: React.FC = () => {
  const { isTableView, toggleToListView, toggleToGridView } = useViewToggle();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white rounded mb-6">
      <h1 className="text-xl font-bold">Car List</h1>
      <div className="flex">
        <button
          onClick={toggleToListView}
          className={`px-4 py-2 ${
            isTableView ? "bg-blue-600" : "bg-gray-300"
          } border-r border-white`}
        >
          List View
        </button>
        <button
          onClick={toggleToGridView}
          className={`px-4 py-2 ${
            !isTableView ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          Grid View
        </button>
      </div>
    </div>
  );
};

export default CarListHeader;
