import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDisplayCategory from "@/hooks/useFetchDisplayCategory";
import { useNavigate } from "react-router-dom";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import BookCard from "./BookCard";
import { ChevronRight } from "lucide-react";

const GenreFilteredBooks = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [showGenre, setShowGenre] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const {
    data: displayCategory,
    refetch: refetchDisplayCategory,
    isLoading: isDisplayCategoryLoading,
  } = useFetchDisplayCategory();

  const handleShowGenre = () => {
    setShowGenre(!showGenre);
  };

  useEffect(() => {
    const fetchGenreFilteredBooks = async () => {
      try {
        const response = await GLOBAL_SERVICE.get(
          `/api/v1/p/resource/get/categories/${categoryId}`
        );
        setBooks(response);
      } catch (error) {
        setError("Error fetching books");
      }
    };
    fetchGenreFilteredBooks();
    refetchDisplayCategory();
  }, [categoryId]);

  if (error) return <p>{error}</p>;
  if (isDisplayCategoryLoading) return <p>Loading genres...</p>;

  return (
    <section className="flex my-9">
      <div className="w-65 max-h-80 overflow-y-auto">
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
              <div className="ml-2 " key={element.categoryId}>
                <button
                  key={element.categoryId}
                  value={element.categoryId}
                  onClick={() =>
                    navigate(`/books/genres/${element.categoryId}`)
                  }
                  className="flex items-center my-1"
                >
                  <ChevronRight />
                  <h4 className="text-[17px] font-semibold cursor-pointer">
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
            {books?.status === 200 &&
            Array.isArray(books?.data) &&
            books?.data?.length !== 0 ? (
              books?.data?.map((element) => (
                <div key={element.bookId}>
                  <BookCard key={element.bookId} curBook={element} />
                </div>
              ))
            ) : (
              <p className="col-span-2">{books?.data?.message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenreFilteredBooks;
