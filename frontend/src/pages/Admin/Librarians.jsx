import { useEffect } from "react";
import useFetchLibrarian from "@/hooks/useFetchLibrarian";
import { DataTable } from "@/components/table/Admin/librarians/data-table";
import { columns } from "@/components/table/Admin/librarians/columns";

const Librarians = () => {
  const {
    data: librarians,
    refetch: refetchLibrarians,
    isLoading,
    error,
  } = useFetchLibrarian();

  useEffect(() => {
    refetchLibrarians();
  }, []);

  useEffect(() => {
    console.log(librarians);
  }, [librarians]);

  return (
    <section className="h-screen">
      {librarians?.data && (
        <div>
          <DataTable columns={columns} data={librarians?.data || []} />
        </div>
      )}
    </section>
  );
};

export default Librarians;
