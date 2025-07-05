import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/UserProfile/BorrowedBooks/data-table";
import { columns } from "@/components/table/UserProfile/BorrowedBooks/columns";
import { useFetchMemberBorrowedBooks } from "@/hooks/useFetchMemberBorrowedBooks";
import { useFetchBorrowedBooksFilters } from "@/hooks/useFetchBorrowedBooksFilters";

const UBorrowedBooks = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filters, setFilters] = useState({
    title: "",
    language: "",
    categoryId: null,
    extended: null,
  });

  const {
    data: memberBorrowedBooks,
    refetch: refetchMemberBorrowedBooks,
    isLoading,
  } = useFetchMemberBorrowedBooks({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters,
  });
  const { data: filterData } = useFetchBorrowedBooksFilters();

  useEffect(() => {
    refetchMemberBorrowedBooks();
  }, []);

  return (
    <div className="ml-64 p-3">
      <div className="flex items-center pt-3 justify-between text-2xl text-[#206ea6]">
        <div className="px-2">
          <h1 className="text-2xl font-bold text-[#206ea6] mb-6 pb-2 border-b-2 border-[#206ea6] inline-block">
            Borrowed Books ({memberBorrowedBooks?.content?.length || "0"})
          </h1>
        </div>
      </div>
      <div>
        {memberBorrowedBooks && (
          <DataTable
            columns={columns}
            data={memberBorrowedBooks?.content || []}
            isLoading={isLoading}
            pageCount={memberBorrowedBooks?.totalPages ?? 0}
            pagination={pagination}
            setPagination={setPagination}
            filters={filters}
            setFilters={setFilters}
            categories={filterData?.categories ?? []}
            languages={filterData?.languages ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default UBorrowedBooks;
