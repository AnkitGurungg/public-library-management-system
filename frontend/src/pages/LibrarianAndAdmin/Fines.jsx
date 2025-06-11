import { useEffect } from "react";
import useFetchFines from "@/hooks/useFetchFines";
import { DataTable } from "@/components/table/LibrarianAndAdmin/fines/data-table";
import { columns } from "@/components/table/LibrarianAndAdmin/fines/columns";

const Fines = () => {
  const {
    data: fines,
    refetch: refetchFines,
    isLoading,
    error,
  } = useFetchFines();

  useEffect(() => {
    refetchFines();
  }, []);

  if (isLoading) return <p>Loading fines...</p>;
  if (error) return <p>Error fetching fines: {error.message}</p>;

  return (
    <section className="min-h-screen">
      {fines?.data && (
        <div>
          <DataTable columns={columns} data={fines?.data || []} />
        </div>
      )}
    </section>
  );
};

export default Fines;
