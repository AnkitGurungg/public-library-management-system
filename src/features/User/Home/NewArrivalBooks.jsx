import useFetchNewArrivalBooks from "@/hooks/useFetchNewArrivalBooks";
import { useEffect } from "react";
import BookCard from "./BookCard";

const NewArrivalBooks = () => {
  const { data: newArrivalBooks, refetch: refetchNewArrivalBooks } =
    useFetchNewArrivalBooks();

  useEffect(() => {
    refetchNewArrivalBooks();
  }, []);

  useEffect(() => {
    console.log(newArrivalBooks);
  }, [newArrivalBooks]);

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <p className="text-2xl font-bold opacity-80 mb-1.5">New Arrivals</p>
      <p className="text-[16px] mb-5 "> New Arrivals. Our new arrivals list.</p>
      <div className="flex flex-grow ">
        <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {newArrivalBooks?.status === 200 &&
          Array.isArray(newArrivalBooks?.data) &&
          newArrivalBooks?.data?.length !== 0 ? (
            newArrivalBooks?.data?.map((element) => (
              <div key={element.bookId}>
                <BookCard key={element.bookId} curBook={element} />
              </div>
            ))
          ) : (
            <p className="col-span-2">
              {newArrivalBooks?.data?.message ||
                "Books are currently unavailable!!!"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalBooks;
