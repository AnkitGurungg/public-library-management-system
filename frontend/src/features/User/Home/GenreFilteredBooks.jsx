import { useState } from "react";
import { useParams } from "react-router-dom";
import BookCard from "./BookCard";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFetchDisplayCategory from "@/hooks/useFetchDisplayCategory";
import useFetchGenreFilteredBooks from "@/hooks/useFetchGenreFilteredBooks";
import { BookLoader } from "@/components/Loading/BookLoader";

const GenreFilteredBooks = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [showGenre, setShowGenre] = useState(true);

  const { data: displayCategory, isLoading: isDisplayCategoryLoading } =
    useFetchDisplayCategory();

  const { data: genreFilteredBooks, isLoading: isGenreFilteredBooksLoading } =
    useFetchGenreFilteredBooks({ categoryId });

  const handleShowGenre = () => {
    setShowGenre(!showGenre);
  };

  if (isDisplayCategoryLoading) return <p>Loading genres...</p>;

  return (
    <section className="flex my-9 ">
      <div className="w-auto min-w-60 max-h-80 overflow-y-auto mr-0.5">
        <button onClick={handleShowGenre}>
          <div className="ml-2 text-lg font-bold opacity-80 cursor-pointer">
            <p></p>
            {displayCategory?.status === 200 &&
            Array.isArray(displayCategory?.data) ? (
              <p>All Genres ({displayCategory.data.length})</p>
            ) : (
              <p>{displayCategory?.data?.message || "No Genres Found"}</p>
            )}
          </div>
        </button>
        <div>
          {showGenre &&
          displayCategory?.status === 200 &&
          Array.isArray(displayCategory?.data) &&
          displayCategory?.data?.length !== 0 ? (
            displayCategory?.data?.map((element) => (
              <div className="ml-2.5" key={element.categoryId}>
                <button
                  key={element.categoryId}
                  value={element.categoryId}
                  onClick={() =>
                    navigate(`/books/genres/${element.categoryId}`)
                  }
                  className="flex items-center my-1 opacity-75 space-y-0.5"
                >
                  <ChevronRight />
                  <h4 className="text-[16px] font-semibold cursor-pointer">
                    {element.name}
                  </h4>
                </button>
              </div>
            ))
          ) : (
            <p>{displayCategory?.data?.message}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-grow">
          <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {isGenreFilteredBooksLoading ? (
              <BookLoader />
            ) : genreFilteredBooks?.status === 200 &&
              Array.isArray(genreFilteredBooks?.data) &&
              genreFilteredBooks?.data?.length !== 0 ? (
              genreFilteredBooks?.data?.map((item) => (
                <div key={item.bookId}>
                  <BookCard key={item.bookId} curBook={item} />
                </div>
              ))
            ) : (
              <p className="col-span-2">
                {genreFilteredBooks?.data?.message || (
                  <span>
                    No books available in this category at the moment. Try
                    exploring other categories.
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenreFilteredBooks;
