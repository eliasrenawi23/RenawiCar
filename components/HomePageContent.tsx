"use client";

import React from "react";
import { Car, carData } from "@/lib/data/cars";
import CarGridView from "@/components/CarGridView";
import CarListHeader from "@/components/CarListHeader";
import { useViewToggle } from "@/context/ViewToggleContext";
import { SortableTable } from "./Table/SortableTable";
import useColumns from "./useColumns";
const HomePageContent: React.FC = () => {
  const { isTableView } = useViewToggle();
  const columns = useColumns();

  const handleSave = async (data: Car[]) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`Saving data: ${data}:`);
    console.log("Saving data:", data);
  };
  return (
    <div>
      <CarListHeader />
      {isTableView ? (
        <SortableTable columns={columns} data={carData} onSave={handleSave} />
      ) : (
        <CarGridView carData={carData} />
      )}
    </div>
  );
};

export default HomePageContent;
