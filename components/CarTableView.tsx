import React from "react";
import { Car } from "@/lib/data/cars";
import CarItem from "./CarItem";

interface CarTableViewProps {
  carData: Car[];
}

const CarTableView: React.FC<CarTableViewProps> = ({ carData }) => (
  <table
    style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
  >
    <thead>
      <tr>
        <th className="border px-4 py-2 bg-gray-200 font-bold">Make</th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">Model</th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">Year</th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">Color</th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">Price</th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">Mileage</th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">
          Purchase Price
        </th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">
          Selling Price
        </th>
        <th className="border px-4 py-2 bg-gray-200 font-bold">Profit</th>
      </tr>
    </thead>
    <tbody>
      {carData.map((car) => (
        <CarItem key={car.id} car={car} isTableView={true} />
      ))}
    </tbody>
  </table>
);

export default CarTableView;
