import React from "react";
import { Car } from "../lib/data/cars";
import Image from "next/image";

interface CarItemProps {
  car: Car;
  isTableView: boolean;
}

const CarItem: React.FC<CarItemProps> = ({ car, isTableView }) => {
  return isTableView ? (
    <tr>
      <td className="border px-4 py-2">{car.make}</td>
      <td className="border px-4 py-2">{car.model}</td>
      <td className="border px-4 py-2">{car.year}</td>
      <td className="border px-4 py-2">{car.color}</td>
      <td className="border px-4 py-2">{car.price}</td>
      <td className="border px-4 py-2">{car.mileage}</td>
      <td className="border px-4 py-2">{`$${car.purchasePrice.toLocaleString()}`}</td>
      <td className="border px-4 py-2">{`$${car.sellingPrice.toLocaleString()}`}</td>
      <td
        className={`border px-4 py-2 ${
          car.profit >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {`$${car.profit.toLocaleString()}`}
      </td>
    </tr>
  ) : (
    <div className="border p-5 rounded shadow-lg text-center">
      <Image
        loader={() => car.photoUrl}
        src={car.photoUrl}
        alt={`${car.make} ${car.model}`}
        width={100}
        height={100}
        className="rounded mb-3 w-full"
      />
      <h3>
        {car.make} {car.model}
      </h3>
      <h3 className="text-lg font-semibold">
        {car.make} {car.model}
      </h3>
      <p>
        <strong>Year:</strong> {car.year}
      </p>
      <p>
        <strong>Color:</strong> {car.color}
      </p>
      <p>
        <strong>Price:</strong> {car.price}
      </p>
      <p>
        <strong>Mileage:</strong> {car.mileage}
      </p>
    </div>
  );
};

export default CarItem;
