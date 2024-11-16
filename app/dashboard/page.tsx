import SortableTable from "@/components/Table/SortableTable";
import useColumns from "@/components/useColumns";
import { carData } from "@/lib/data/cars";
import React from "react";

const Page = () => {
  const columns = useColumns();

  return (
    <div>
      <SortableTable columns={columns} data={carData} onSave={undefined} />
    </div>
  );
};

export default Page;
