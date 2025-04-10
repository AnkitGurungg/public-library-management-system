import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import { NotepadText } from "lucide-react";
import { useEffect, useState } from "react";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";

const ViewBook = ({ id }) => {
  const { data: books } = useFetchBooks();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (books?.data && Array.isArray(books.data)) {
      const foundBook = books.data.find((element) => element.bookId === id);
      setBook(foundBook || null);
    }
  }, [books, id]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <NotepadText />
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Book</DialogTitle>
          </DialogHeader>
          <hr />
          {book ? (
            <ScrollArea>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <strong>ISBN:</strong> {book.isbn}
                  </p>
                  <p>
                    <strong>Title:</strong> {book.title}
                  </p>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Category:</strong> {book.category?.name}
                  </p>
                  <p>
                    <strong>Language:</strong> {book.language}
                  </p>
                  <p>
                    <strong>Edition:</strong> {book.edition}
                  </p>
                  <p>
                    <strong>Page Count:</strong> {book.pageCount}
                  </p>
                  <p>
                    <strong>Published Date:</strong> {book.publishedDate}
                  </p>
                  <p>
                    <strong>Added Date:</strong> {book.addedDate}
                  </p>
                  <p>
                    <strong>Updated Date:</strong> {book.updatedDate}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {book.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {book.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {book.description}
                  </p>
                </div>
                <div>
                  <img
                    src={`${BACKEND_SERVER_BASE_URL}${book.imageURL}`}
                    alt={book.title}
                    className="max-h-96 object-contain"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose>Close</DialogClose>
              </DialogFooter>
            </ScrollArea>
          ) : (
            <p>Does not exist</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewBook;
