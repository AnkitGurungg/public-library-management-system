import useFetchNewArrivalBooks from "@/hooks/useFetchNewArrivalBooks";
import { useEffect } from "react";
import HoverBookCard from "./HoverBookCard";
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
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex flex-grow ">
        <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-6 gap-3">
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
