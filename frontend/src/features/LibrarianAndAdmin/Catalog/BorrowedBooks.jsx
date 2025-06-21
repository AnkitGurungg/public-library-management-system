import { useFetchBorrowedBooks } from "../../../hooks/useFetchBorrowedBooks";
import { columns } from "@/components/table/LibrarianAndAdmin/catalog/BorrowedBook/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/catalog/BorrowedBook/data-table";
import { useEffect, useState } from "react";

const BorrowedBooks = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 11,
  });
  const [filters, setFilters] = useState({
    name: "",
    extended: null,
    returnStatus: null,
  });

  const {
    data: borrowedBooks,
    refetch: refetchBorrowedBooks,
    isLoading,
  } = useFetchBorrowedBooks({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters,
  });

  useEffect(() => {
    refetchBorrowedBooks();
  }, [pagination]);

  useEffect(() => {
    // console.log(filters);
  }, [filters]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      <DataTable
        columns={columns}
        data={borrowedBooks?.data?.content ?? []}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={borrowedBooks?.data?.totalPages ?? 0}
        isLoading={isLoading}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default BorrowedBooks;
