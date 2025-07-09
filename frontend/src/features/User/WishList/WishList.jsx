import { useEffect, useState } from "react";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { columns } from "@/components/table/UserProfile/WishList/columns";
import { DataTable } from "@/components/table/UserProfile/WishList/data-table";
import { useFetchWishlistFilters } from "@/hooks/useFetchWishlistFilters";
import WishListSearchFilters from "@/components/UserProfile/WishListSearchFilters";

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
      <div className="flex items-center pt-1 justify-between text-2xl text-[#206ea6]">
        <div className="px-2 mb-6">
          <h1 className="text-2xl font-bold text-[#206ea6] pb-0.5 border-b-2 border-[#206ea6] inline-block">
            WishList ({memberWishList?.content?.length || "0"})
          </h1>

          <p className="mt-0.5 text-sm text-gray-500 max-w-2xl leading-relaxed">
            All books added to the wishlist appear here. Books can be saved for
            future reference.
          </p>
        </div>
      </div>

      <WishListSearchFilters
        filters={filters}
        setFilters={setFilters}
        categories={filterData?.categories ?? []}
        languages={filterData?.languages ?? []}
      />

      {memberWishList?.content && (
        <DataTable
          columns={columns(refetchMemberWishList)}
          data={memberWishList?.content}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={memberWishList?.totalPages ?? 0}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default WishList;
