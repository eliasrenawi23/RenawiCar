// components/HomePageContent.tsx
"use client";

import React from "react";
import { carData } from "@/lib/data/cars";
import CarGridView from "@/components/CarGridView";
import CarListHeader from "@/components/CarListHeader";
import { useViewToggle } from "@/context/ViewToggleContext";
import SortableTable from "./SortableTable";

const HomePageContent: React.FC = () => {
  const { isTableView } = useViewToggle();

  return (
    <div>
      <CarListHeader />
      {isTableView ? (
        // <CarTableView carData={carData} />
        <SortableTable />
      ) : (
        <CarGridView carData={carData} />
      )}
      {/* <SortableTable /> */}
    </div>
  );
};

export default HomePageContent;
