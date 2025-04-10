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
    <section>
      {book && (
        <div className="mx-24">
          <div className="my-10">
            Home/{book?.category?.name}/{book?.title}
          </div>
          <div className="flex ">
            <div className="h-70 w-50">
              {/* <img src={book?.imageURL} alt="jhhj" /> */}
              <img
                src="/react.svg"
                alt="jhhj"
                className="w-full h-full bg-red-400"
              />
            </div>
            <div className="flex-grow">
              <p>{book?.title}</p>
              <p>{book?.author}</p>
              <p>{book?.description || "Description is not available"}</p>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div>
              <p>Page Count</p>
              <img src="" alt="efj" />
              <p>{book?.pageCount}</p>
            </div>
            <div>
              <p>Edition</p>
              <img src="" alt="efj" />
              <p>{book?.edition}</p>
            </div>
            <div>
              <p>Published On</p>
              <img src="" alt="efj" />
              <p>{book?.publishedDate}</p>
            </div>
            <div>
              <p>Language</p>
              <img src="" alt="efj" />
              <p>{book?.language}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpecificBook;
