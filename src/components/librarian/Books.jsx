import { useFetchBooks } from "../hooks/useFetchBooks";
import AddBook from "./modals/AddBook";

const Books = () => {
  const { data:books } = useFetchBooks();

  return (
    <div>
      <h1>Books</h1>
      <AddBook />
    </div>
  );
};

export default Books;