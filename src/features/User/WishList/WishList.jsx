import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { useEffect, useState } from "react";
import WishListCard from "./WishListCard";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

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
    console.log(memberWishList);
  }, [memberWishList]);

  // return (
  // <div className="flex-1 p-6 bg-white">
  //   <div className="flex flex-col max-w-4xl">
  //     <div>
  //       {memberWishList?.status === 200 &&
  //         Array.isArray(memberWishList?.data?.userWishLists) && (
  //           <h1 className="text-3xl text-black font-bold mb-8">
  //             WishList ({memberWishList?.data?.userWishLists?.length})
  //           </h1>
  //         )}
  //     </div>
  //     <div className="space-y-8">
  //       {memberWishList?.status === 200 &&
  //         Array.isArray(memberWishList?.data?.userWishLists) &&
  //         memberWishList?.data?.userWishLists.map((currWishListBook) => (
  //           <WishListCard
  //             key={currWishListBook.wishListId}
  //             currWishListBook={currWishListBook}
  //             refetchWishList={refetchMemberWishList}
  //           />
  //         ))}
  //     </div>
  //   </div>
  // </div>
  // }

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Wishlist</h1>
        <span className="text-gray-500 text-lg">
          {memberWishList?.data?.userWishLists?.length || 0} books
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {memberWishList?.data?.userWishLists.map((currWishListBook) => (
          <WishListCard
            key={currWishListBook.wishListId}
            currWishListBook={currWishListBook}
            refetchWishList={refetchMemberWishList}
          />
        ))}
      </div>

      {memberWishList?.data?.userWishLists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books in wishlist yet.</p>
          <Button asChild className="mt-4">
            <NavLink to="/">Browse Books</NavLink>
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishList;
