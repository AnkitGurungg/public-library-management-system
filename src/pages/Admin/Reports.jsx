import { columns } from "@/components/table/books/columns";
import { DataTable } from "@/components/table/books/data-table";
import { useFetchBooks } from "@/hooks/useFetchBooks";

const Reports = () => {
  const { data: books, isLoading } = useFetchBooks();
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={books.data} />
    </div>
  );
};

export default Reports;
