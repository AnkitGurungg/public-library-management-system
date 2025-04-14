import { useEffect, useState } from "react";
import WishListCard from "./WishListCard";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
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
    console.log("njenfjenf");
  }, []);

  useEffect(() => {
    console.log(memberWishList?.data?.userWishLists);
  }, [memberWishList]);

  return (
    // <div className="ml-64 p-8 bg-red-500">
    //   <div className="flex items-center justify-between mb-8">
    //     <h1 className="text-3xl font-bold">Wishlist</h1>
    //     <span className="text-gray-500 text-lg">
    //       {(memberWishList?.status === 200 &&
    //         memberWishList?.data?.userWishLists?.length) ||
    //         0}{" "}
    //       books
    //     </span>
    //   </div>

    //   <div className="grid grid-cols-2 gap-6">
    //     {memberWishList?.status === 200 &&
    //       Array.isArray(memberWishList?.data?.userWishLists) &&
    //       memberWishList?.data?.userWishLists.map((currWishListBook) => (
    //         <WishListCard
    //           key={currWishListBook.wishListId}
    //           currWishListBook={currWishListBook}
    //           refetchWishList={refetchMemberWishList}
    //         />
    //       ))}
    //   </div>

    //   {memberWishList?.data?.userWishLists.length === 0 && (
    //     <div className="text-center py-12">
    //       <p className="text-muted-foreground">No books in wishlist yet.</p>
    //       <Button asChild className="mt-4">
    //         <NavLink to="/">Browse Books</NavLink>
    //       </Button>
    //     </div>
    //   )}
    // </div>

    <div className="ml-64 p-3">
      <div className="flex items-center pt-3 justify-between text-2xl text-[#206ea6]">
        <div className="px-2">
          <h1 className="text-2xl font-bold text-[#206ea6] mb-6 pb-2 border-b-2 border-[#206ea6] inline-block">
            WishList ({memberWishList?.data?.userWishLists?.length || "0"})
          </h1>
        </div>
      </div>
      {memberWishList?.data?.userWishLists && (
        <DataTable
          columns={columns(refetchMemberWishList)}
          data={memberWishList?.data?.userWishLists}
        />
      )}
    </div>
  );
};

export default WishList;
