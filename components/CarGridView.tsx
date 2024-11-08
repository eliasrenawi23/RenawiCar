import React from "react";
import { Car } from "@/lib/data/cars";
import CarItem from "./CarItem";

interface CarGridViewProps {
  carData: Car[];
}

const CarGridView: React.FC<CarGridViewProps> = ({ carData }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
    {carData.map((car) => (
      <CarItem key={car.id} car={car} isTableView={false} />
    ))}
  </div>
);

export default CarGridView;
