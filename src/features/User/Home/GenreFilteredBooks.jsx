import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDisplayCategory from "@/hooks/useFetchDisplayCategory";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const GenreFilteredBooks = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [showGenre, setShowGenre] = useState(false);

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
    console.log(displayCategory?.data);
  }, [categoryId]);

  useEffect(() => {
    console.log(displayCategory);
  }, [books]);

  if (error) return <p>{error}</p>;
  if (isDisplayCategoryLoading) return <p>Loading genres...</p>;

  return (
    <section className="flex">
      <div className="w-65 max-h-80 overflow-y-auto">
        <button onClick={handleShowGenre}>
          <div>
            <p>All Genres</p>
            {displayCategory?.status === 200 &&
            Array.isArray(displayCategory?.data) ? (
              <p>{displayCategory.data.length} Genres</p>
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
              <div className="" key={element.categoryId}>
                <button
                  key={element.categoryId}
                  value={element.categoryId}
                  onClick={() =>
                    navigate(`/books/genres/${element.categoryId}`)
                  }
                >
                  <h4 className="text-[20px] font-semibold">{element.name}</h4>
                </button>
              </div>
            ))
          ) : (
            <p>{displayCategory?.data?.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-grow-1 gap-0">
        <div className="grid grid-cols-5 ">
          {books?.status === 200 &&
          Array.isArray(books?.data) &&
          books?.data?.length !== 0 ? (
            books?.data?.map((element) => (
              <div key={element.bookId}>
                <Card key={element.bookId} curBook={element} />
              </div>
            ))
          ) : (
            <p className="col-span-2">{books?.data?.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GenreFilteredBooks;
