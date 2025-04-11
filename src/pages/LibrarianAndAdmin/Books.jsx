import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useFetchBooks } from "../../hooks/useFetchBooks";
import AddBook from "../../features/LibrarianAndAdmin/Books/AddBook";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "../../components/ui/table";
import { useEffect, useState } from "react";
import Delete from "../../components/Delete";
import UpdateBook from "../../features/LibrarianAndAdmin/Books/UpdateBook";
import ViewBook from "@/features/LibrarianAndAdmin/Books/ViewBook";

const Books = () => {
  const { data: books, refetch: refetchBooks } = useFetchBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    refetchBooks();
  }, []);

  useEffect(() => {
    if (books?.status === 200 && Array.isArray(books?.data)) {
      const lowerSearch = searchTerm.toLowerCase();

      const filtered = books.data.filter((book) =>
        book.title?.toLowerCase().includes(lowerSearch)
      );
      setFilteredBooks(searchTerm.trim() === "" ? books.data : filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [books, searchTerm]);

  return (
    <section>
      <div className="flex flex-flex md:items-center gap-4">
        <h1 className="text-xl">Available Books</h1>
        <div className="flex items-end">
          <AddBook />
          <Input
            placeholder="Search here"
            className="bg-white mr-3 w-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        </div>
      </div>

      <div className="bg-white rounded-2xl mt-3 text-black">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
              filteredBooks.map((element, index) => (
                <TableRow key={element.bookId || index}>
                  <TableCell>{element.bookId}</TableCell>
                  <TableCell>{element.title}</TableCell>
                  <TableCell>{element.category?.name}</TableCell>
                  <TableCell>{element.language}</TableCell>
                  <TableCell>{element.quantity}</TableCell>
                  <TableCell className="flex flex-row justify-center items-center">
                    <div className="relative group">
                      <UpdateBook id={element.bookId} />
                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Update Book
                      </span>
                    </div>
                    <div className="relative group">
                      <ViewBook id={element.bookId} />
                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Book
                      </span>
                    </div>

                    <div className="relative group">
                      <Delete
                        id={element.bookId}
                        name={element.title}
                        type={"book"}
                      />
                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Delete Book
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  {searchTerm.trim()
                    ? "No matching books found."
                    : Array.isArray(books?.data)
                    ? "No books available."
                    : books?.data?.message || "No books available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Books;
