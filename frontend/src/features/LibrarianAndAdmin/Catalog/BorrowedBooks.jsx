import { CircleMinus } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import { useFetchBorrowedBooks } from "../../../hooks/useFetchBorrowedBooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import ReturnBook from "./ReturnBook";
import { columns } from "@/components/table/LibrarianAndAdmin/catalog/BorrowedBook/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/catalog/BorrowedBook/data-table";

const BorrowedBooks = () => {
  const {
    data: borrowedBooks,
    refetch: refetchBorrowedBooks,
    isLoading,
  } = useFetchBorrowedBooks();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      <DataTable columns={columns} data={borrowedBooks?.data || []} />
    </div>
  );
};

export default BorrowedBooks;
