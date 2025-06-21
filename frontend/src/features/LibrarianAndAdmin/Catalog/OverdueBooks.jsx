import useFetchOverdueBooks from "@/hooks/useFetchOverdueBooks";
import { columns } from "@/components/table/LibrarianAndAdmin/catalog/OverdueBook/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/catalog/OverdueBook/data-table";
import { useState, useEffect } from "react";

const OverdueBooks = () => {
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
    data: overdueBooks,
    refetch: refetchOverdueBooks,
    isLoading,
  } = useFetchOverdueBooks({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters,
  });

  useEffect(() => {
    refetchOverdueBooks();
  }, [pagination]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      <DataTable
        columns={columns}
        data={overdueBooks?.data?.content ?? []}
        pagination={pagination}
        setPagination={setPagination}
        pageCount={overdueBooks?.data?.totalPages ?? 0}
        isLoading={isLoading}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default OverdueBooks;
