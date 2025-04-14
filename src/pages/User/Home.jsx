import { Input } from "@/components/ui/input";
import BookCard from "@/features/User/Home/BookCard";
import HoverBookCard from "@/features/User/Home/HoverBookCard";
import useFetchNewArrivalBooks from "@/hooks/useFetchNewArrivalBooks";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { useFetchTopBorrowedBooks } from "@/hooks/useFetchTopBorrowedBooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const {
    data: newArrivalBooks,
    refetch: refetchNewArrivalBooks,
    isLoading,
    isFetched,
  } = useFetchNewArrivalBooks();
  const { data: topBorrowedBooks, refetch: refetchTopBorrowedBooks } =
    useFetchTopBorrowedBooks();

  useEffect(() => {
    refetchNewArrivalBooks();
    refetchTopBorrowedBooks();
  }, []);

  return (
    // <div className="max-w-7xl mx-auto px-16 py-16">
    //   <ul className="grid grid-cols-5 justify-center items-center gap-5">
    //     {displayBooks?.status === 200 &&
    //       displayBooks.data?.length > 0 &&
    //       displayBooks?.data?.map((curBook) => (
    //         <BookCard key={curBook.bookId} curBook={curBook} />
    //         // <Card key={curBook.bookId} curBook={curBook} />
    //       ))}
    //   </ul>
    // </div>

    <section>
      <div className="max-w-7xl mx-auto px-16 py-4">
        <div className="mb-5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl opacity-80">
              Top Borrowed Books
            </h2>
            <button
              className="text-gray-500 cursor-pointer"
              onClick={() => navigate("/top-borrowed-books")}
            >
              Show all
            </button>
          </div>
          <p className="text-[16px]">
            Find Your Next Great Read Among Our Top Borrowed Books
          </p>
        </div>
        <ul className="grid grid-cols-5 justify-center items-center gap-5">
          {topBorrowedBooks?.status === 200 &&
            topBorrowedBooks?.data?.length > 0 &&
            topBorrowedBooks?.data
              ?.slice(0, 5)
              .map((item) => (
                <BookCard
                  key={item.borrowBooks.bookId}
                  curBook={item.borrowBooks}
                />
              ))}
        </ul>
      </div>

      <div className="max-w-7xl mx-auto px-16 py-4">
        <div className="mb-6 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl opacity-80">New Arrivals</h2>
            <button
              className="text-gray-500 cursor-pointer"
              onClick={() => navigate("/new-arrivals")}
            >
              Show all
            </button>
          </div>
          <p className="text-[16px]">
            Explore Fresh Arrivals and Find Your Next Great Read.
          </p>
        </div>
        <ul className="grid grid-cols-5 justify-center items-center gap-5">
          {newArrivalBooks?.status === 200 &&
            newArrivalBooks?.data?.length > 0 &&
            newArrivalBooks?.data
              ?.slice(0, 5)
              .map((curBook) => (
                <BookCard key={curBook.bookId} curBook={curBook} />
              ))}
        </ul>
      </div>

      {/* <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-white">
        <div className="grid grid-cols-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HoverBookCard key={curBook.bookId} curBook={curBook} />
        </div>
      </main> */}
    </section>
  );
};

export default Home;
