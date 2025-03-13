import { CornerRightDown } from "lucide-react";
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
import ReturnBook from "./ReturnBook";

const BorrowedBooks = () => {
  const { data: borrowedBooks, refetch: refetchBorrowedBooks } =
    useFetchBorrowedBooks();
  console.log(borrowedBooks);

  return (
    <div className="bg-white mt-4 rounded-[8px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Id</TableHead>
            <TableHead>User Id</TableHead>
            <TableHead>Borrowed date</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead>Extended</TableHead>
            <TableHead>Return status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrowedBooks?.status === 404 && (
            <TableRow>
              <TableCell colSpan={7}>{borrowedBooks?.data}</TableCell>
            </TableRow>
          )}
          {borrowedBooks?.status === 500 && (
            <TableRow>
              <TableCell colSpan={7}>{borrowedBooks?.data}</TableCell>
            </TableRow>
          )}
          {borrowedBooks?.status === 200 &&
            borrowedBooks?.data?.map((element, index) => (
              <TableRow key={element.borrowId || index}>
                <TableCell>{element.borrowBooks.bookId}</TableCell>
                <TableCell>{element.borrowUsers.userId}</TableCell>
                <TableCell>{element.borrowDate}</TableCell>
                <TableCell>{element.dueDate}</TableCell>
                <TableCell>{element.extended ? "Yes" : "No"}</TableCell>
                <TableCell>{element.returnStatus ? "Yes" : "No"}</TableCell>
                <TableCell>
                    {element.returnStatus ? <CircleCheckBig /> : <ReturnBook id={element.borrowId} />}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowedBooks;