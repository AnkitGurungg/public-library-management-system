import { useFetchBorrowedBooks } from "../../../hooks/useFetchBorrowedBooks";
import { columns } from "@/components/table/LibrarianAndAdmin/catalog/BorrowedBook/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/catalog/BorrowedBook/data-table";
import { useEffect } from "react";

const BorrowedBooks = () => {
  const {
    data: borrowedBooks,
    refetch: refetchBorrowedBooks,
    isLoading,
  } = useFetchBorrowedBooks();

  useEffect(() => {
    refetchBorrowedBooks();
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      <DataTable columns={columns} data={borrowedBooks?.data || []} />
    </div>
  );
};

export default BorrowedBooks;
