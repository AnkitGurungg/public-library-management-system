import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const SpecificBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState({});

  const getBook = async () => {
    try {
      const response = await GLOBAL_SERVICE.get(
        `http://localhost:8080/api/v1/la/book/get/${bookId}`
      );
      if (response?.status === 200 && Object.keys(response?.data).length > 0) {
        setBook(response?.data);
      }
    } catch (error) {
      if (
        error.status === 404 ||
        error.status === 500 ||
        error.status === 400
      ) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  useEffect(() => {
    console.log(book);
  }, [book]);

  return (
    <section className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          Home / {book.category?.name || "Category"} /{" "}
          {book.title || "Book Title"}
        </div>

        {/* Book details */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Book cover */}
          <div className="w-full md:w-1/4 max-w-xs">
            <img
              src="/react.svg"
              alt={book.title || "Book cover"}
              className="w-full aspect-[3/4] bg-red-400 rounded-lg object-contain"
            />
          </div>

          {/* Book info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              {book.title || "Book Title"}
            </h1>
            <p className="text-lg text-gray-700 mb-3">
              {book.author || "Author"}
            </p>
            <p className="text-gray-600">
              {book.description || "Description is not available"}
            </p>
          </div>
        </div>

        {/* Book metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 border border-gray-200 rounded-lg">
            <p className="font-medium mb-2">Page Count</p>
            <p className="text-lg">{book.pageCount || "N/A"}</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 border border-gray-200 rounded-lg">
            <p className="font-medium mb-2">Edition</p>
            <p className="text-lg">{book.edition || "N/A"}</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 border border-gray-200 rounded-lg">
            <p className="font-medium mb-2">Published On</p>
            <p className="text-lg">{book.publishedDate || "N/A"}</p>
          </div>

          <div className="flex flex-col items-center text-center p-4 border border-gray-200 rounded-lg">
            <p className="font-medium mb-2">Language</p>
            <p className="text-lg">{book.language || "N/A"}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificBook;
