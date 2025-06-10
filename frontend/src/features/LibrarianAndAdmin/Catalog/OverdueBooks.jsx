import useFetchOverdueBooks from "@/hooks/useFetchOverdueBooks";
import { columns } from "@/components/table/LibrarianAndAdmin/catalog/OverdueBook/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/catalog/OverdueBook/data-table";
import { useEffect } from "react";

const OverdueBooks = () => {
  const {
    data: overdueBooks,
    refetch: refetchOverdueBooks,
    isLoading,
    error,
  } = useFetchOverdueBooks();

  useEffect(() => {
    refetchOverdueBooks();
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      <DataTable columns={columns} data={overdueBooks?.data || []} />
    </div>
  );
};

export default OverdueBooks;
