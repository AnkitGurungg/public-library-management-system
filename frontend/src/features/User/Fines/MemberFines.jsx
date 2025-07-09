import { useEffect, useState } from "react";
import { columns } from "@/components/table/UserProfile/Fines/columns";
import { DataTable } from "@/components/table/UserProfile/Fines/data-table";
import { useFetchMemberFines } from "@/hooks/useFetchMemberFines";
import { useFetchBorrowedBooksFilters } from "@/hooks/useFetchBorrowedBooksFilters";
import MemberFineSearchFilters from "@/components/UserProfile/MemberFineSearchFilters";

const MemberFines = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filters, setFilters] = useState({
    title: "",
    categoryId: null,
    extended: null,
    paid: null,
  });

  const {
    data: memberFines,
    refetch: refetchMemberFines,
    isLoading,
  } = useFetchMemberFines({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    filters: filters,
  });
  const { data: filterData } = useFetchBorrowedBooksFilters();

  useEffect(() => {
    refetchMemberFines();
  }, []);

  useEffect(() => {
    // console.log("MemberFines: ", memberFines);
  }, [memberFines]);

  return (
    <div className="ml-64 p-3">
      <div className="flex items-center pt-1 justify-between text-2xl text-[#206ea6]">
        <div className="px-2 mb-6">
          <h1 className="text-2xl font-bold text-[#206ea6] pb-0.5 border-b-2 border-[#206ea6] inline-block">
            Fines ({memberFines?.content?.length || "0"})
          </h1>

          <p className="mt-0.5 text-sm text-gray-500 max-w-2xl leading-relaxed">
            All fines for overdue books are shown here. Clear pending fines to
            continue borrowing books.
          </p>
        </div>
      </div>
      
      <div>
        <MemberFineSearchFilters
          filters={filters}
          setFilters={setFilters}
          categories={filterData?.categories ?? []}
        />

        {memberFines && (
          <DataTable
            columns={columns(refetchMemberFines)}
            data={memberFines?.content}
            isLoading={isLoading}
            pageCount={memberFines?.totalPages ?? 0}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </div>
    </div>
  );
};

export default MemberFines;
