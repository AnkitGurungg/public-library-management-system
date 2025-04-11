import { Input } from "@/components/ui/input";
import Card from "@/features/User/Home/Card";
import useFetchDisplayBooks from "@/hooks/useFetchDisplayBooks";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { useEffect, useState } from "react";

const Home = () => {
  const {
    data: displayBooks,
    refetch: refetchDisplayBooks,
    isLoading,
    isFetched,
  } = useFetchDisplayBooks();

  useEffect(() => {
    refetchDisplayBooks();
  }, []);

  return (
    <div>
      <ul className="grid grid-cols-5 justify-center items-center">
        {displayBooks?.status === 200 &&
          displayBooks.data?.length > 0 &&
          displayBooks?.data?.map((curBook) => (
            <Card key={curBook.bookId} curBook={curBook} />
          ))}
      </ul>
    </div>
  );
};

export default Home;
