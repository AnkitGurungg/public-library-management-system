import { useEffect } from "react";
import { columns } from "@/components/table/Admin/reports/MostPopularCategory/columns";
import { DataTable } from "@/components/table/Admin/reports/MostPopularCategory/data-table";
import { useFetchMostPopularCategory } from "@/hooks/Report/useFetchMostPopularCategory";

export const MostPopularCategory = () => {
  const { data: mostPopularCategory, refetch: refetchMostPopularCategory } =
    useFetchMostPopularCategory();

  useEffect(() => {
    refetchMostPopularCategory();
  }, []);

  useEffect(() => {
    // console.table(mostPopularCategory);
  }, [mostPopularCategory]);

  return (
    <section className="bg-gray-100 min-h-screen">
      {mostPopularCategory?.data && (
        <div>
          <DataTable columns={columns} data={mostPopularCategory?.data} />
        </div>
      )}
    </section>
  );
};
