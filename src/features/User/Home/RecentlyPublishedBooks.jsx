import { useFetchRecentlyPublished } from "@/hooks/useFetchRecentlyPublished";
import { useEffect } from "react";
import BookCard from "./BookCard";

const RecentlyPublishedBooks = () => {
  const { data: recentlyPublished, refetch: refetchRecentlyPublished } =
    useFetchRecentlyPublished();

  useEffect(() => {
    refetchRecentlyPublished();
  }, []);

  useEffect(() => {
    console.log(recentlyPublished);
  }, [recentlyPublished]);

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <div className="flex flex-grow ">
        <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {recentlyPublished?.status === 200 &&
          Array.isArray(recentlyPublished?.data) &&
          recentlyPublished?.data?.length !== 0 ? (
            recentlyPublished?.data?.map((element) => (
              <div key={element.bookId}>
                <BookCard key={element.bookId} curBook={element} />
              </div>
            ))
          ) : (
            <p className="col-span-2">
              {recentlyPublished?.data?.message ||
                "Books are currently unavailable!!!"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentlyPublishedBooks;
