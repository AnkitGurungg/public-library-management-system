import { useEffect, useState } from "react";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { columns } from "@/components/table/UserProfile/WishList/columns";
import { DataTable } from "@/components/table/UserProfile/WishList/data-table";
import { useFetchWishlistFilters } from "@/hooks/useFetchWishlistFilters";

const WishList = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [filters, setFilters] = useState({
    title: "",
    language: "",
    categoryId: null,
    inStock: null,
  });

  useEffect(() => {
    // console.log("WishList Filters: ", filters);
  }, [filters]);

  const {
    data: memberWishList,
    refetch: refetchMemberWishList,
    isLoading,
    isFetched,
  } = useFetchMemberWishList({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    filters: filters,
  });
  const { data: filterData } = useFetchWishlistFilters();

  useEffect(() => {
    refetchMemberWishList();
  }, []);

  return (
    <div className="ml-64 p-3">
      <div className="flex items-center pt-3 justify-between text-2xl text-[#206ea6]">
        <div className="px-2">
          <h1 className="text-2xl font-bold text-[#206ea6] mb-6 pb-2 border-b-2 border-[#206ea6] inline-block">
            WishList ({memberWishList?.content?.length || "0"})
          </h1>
        </div>
      </div>
      {memberWishList?.content && (
        <DataTable
          columns={columns(refetchMemberWishList)}
          data={memberWishList?.content}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={memberWishList?.totalPages ?? 0}
          isLoading={isLoading}
          filters={filters}
          setFilters={setFilters}
          categories={filterData?.categories ?? []}
          languages={filterData?.languages ?? []}
        />
      )}
    </div>
  );
};

export default WishList;
