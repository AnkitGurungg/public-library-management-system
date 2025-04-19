import { useEffect, useState } from "react";
import { useFetchBooks } from "../../hooks/useFetchBooks";
import { columns } from "@/components/table/LibrarianAndAdmin/books/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/books/data-table";

const Books = () => {
  const { data: books, refetch: refetchBooks } = useFetchBooks();

  useEffect(() => {
    refetchBooks();
  }, []);

  useEffect(() => {
    console.log(books);
    console.log(books?.data);
  }, [books]);

  return (
    <section className="min-h-screen">
      {books?.data && (
        <div>
          <DataTable columns={columns} data={books?.data} />
        </div>
      )}
    </section>
  );
};

export default Books;
