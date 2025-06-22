import { useFetchShelfs } from "../../hooks/useFetchShelfs";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/table/LibrarianAndAdmin/shelfs/data-table";
import { columns } from "@/components/table/LibrarianAndAdmin/shelfs/columns";

const Shelfs = () => {
  const {
    data: shelfs,
    refetch: refetchShelfs,
    isLoading,
    error,
  } = useFetchShelfs();

  useEffect(() => {
    refetchShelfs();
  }, []);

  return (
    <section className="min-h-screen">
      {shelfs?.data && (
        <div>
          <DataTable columns={columns} data={shelfs?.data || []} />
        </div>
      )}
    </section>
  );
};

export default Shelfs;
