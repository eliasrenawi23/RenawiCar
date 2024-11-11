// components/HomePageContent.tsx
"use client";

import React from "react";
import { Car, carData } from "@/lib/data/cars";
import CarGridView from "@/components/CarGridView";
import CarListHeader from "@/components/CarListHeader";
import { useViewToggle } from "@/context/ViewToggleContext";
import { SortableTable } from "./SortableTable";
import useColumns from "./useColumns";
const HomePageContent: React.FC = () => {
  const { isTableView } = useViewToggle();
  const columns = useColumns({});

  const handleSave = async (data: Car[]) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`Saving data: ${data}:`);
    console.log("Saving data:", data);
    // Here you would typically send the updated data to your server
  };
  return (
    <div>
      <CarListHeader />
      {isTableView ? (
        // <CarTableView carData={carData} />
        <SortableTable columns={columns} data={carData} onSave={handleSave} />
      ) : (
        <CarGridView carData={carData} />
      )}
      {/* <SortableTable /> */}
    </div>
  );
};

export default HomePageContent;
