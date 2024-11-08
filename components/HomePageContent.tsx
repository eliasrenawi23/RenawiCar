// components/HomePageContent.tsx
"use client";

import React from "react";
import { carData } from "@/lib/data/cars";
import CarTableView from "@/components/CarTableView";
import CarGridView from "@/components/CarGridView";
import CarListHeader from "@/components/CarListHeader";
import { useViewToggle } from "@/context/ViewToggleContext";

const HomePageContent: React.FC = () => {
  const { isTableView } = useViewToggle();

  return (
    <div>
      <CarListHeader />
      {isTableView ? (
        <CarTableView carData={carData} />
      ) : (
        <CarGridView carData={carData} />
      )}
    </div>
  );
};

export default HomePageContent;
