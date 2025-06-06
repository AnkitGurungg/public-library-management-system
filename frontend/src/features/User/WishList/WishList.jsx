import { useEffect, useState } from "react";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { columns } from "@/components/table/UserProfile/WishList/columns";
import { DataTable } from "@/components/table/UserProfile/WishList/data-table";

const WishList = () => {
  const {
    data: memberWishList,
    refetch: refetchMemberWishList,
    isLoading,
    isFetched,
  } = useFetchMemberWishList();

  useEffect(() => {
    refetchMemberWishList();
  }, []);

  useEffect(() => {
    // console.log(memberWishList);
  }, [memberWishList]);

  return (
    <div className="ml-64 p-3">
      <div className="flex items-center pt-3 justify-between text-2xl text-[#206ea6]">
        <div className="px-2">
          <h1 className="text-2xl font-bold text-[#206ea6] mb-6 pb-2 border-b-2 border-[#206ea6] inline-block">
            WishList ({memberWishList?.data?.length || "0"})
          </h1>
        </div>
      </div>
      {memberWishList?.data && (
        <DataTable
          columns={columns(refetchMemberWishList)}
          data={memberWishList?.data}
        />
      )}
    </div>
  );
};

export default WishList;
