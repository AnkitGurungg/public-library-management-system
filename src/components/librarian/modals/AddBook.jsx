import { useFetchCategory } from "@/components/hooks/useFetchCategory";

const AddBook = () => {
  const { data: categories } = useFetchCategory();

  return (
    <div>
      <h1>Add book modal</h1>
    </div>
  );
};

export default AddBook;