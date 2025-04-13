import useFetchNewArrivalBooks from "@/hooks/useFetchNewArrivalBooks";
import { useEffect } from "react";
import HoverBookCard from "./HoverBookCard";

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
    <section>
      <div className="flex flex-grow">
        <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 space-y-0">
          {newArrivalBooks?.status === 200 &&
          Array.isArray(newArrivalBooks?.data) &&
          newArrivalBooks?.data?.length !== 0 ? (
            newArrivalBooks?.data?.map((element) => (
              <div key={element.bookId}>
                <HoverBookCard key={element.bookId} curBook={element} />
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
