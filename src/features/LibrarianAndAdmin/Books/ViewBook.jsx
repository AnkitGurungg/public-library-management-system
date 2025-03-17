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

const ViewBook = ({ id }) => {
  const ServerAPI = "http://localhost:8080/"
  const { data: books, refetch: refetchBooks } = useFetchBooks();

  const book = books?.data?.find((element) => element.bookId === id);

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
          {book != null && book != undefined ? (
            <ScrollArea>
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <div>
                    <p>ISBN: {book.isbn}</p>
                  </div>
                  <div>
                    <p>Title: {book.title}</p>
                  </div>
                  <div>
                    <p>Author: {book.author}</p>
                  </div>
                  <div>
                    <div>
                      <p>Category: {book.category.name}</p>
                    </div>
                    <div>
                      <p>Language: {book.language}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>Edition: {book.edition}</p>
                    </div>
                    <div>
                      <p>Published Date: {book.publishedDate}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>Added Date: {book.addedDate}</p>
                    </div>
                    <div>
                      <p>Updated Date: {book.updatedDate}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>Quantity: {book.quantity}</p>
                    </div>
                    <div>
                      <p>Price: {book.price}</p>
                    </div>
                  </div>
                  <div>
                    <p>Description: {book.description}</p>
                  </div>
                </div>
                <div className="col-span-1">
                  <img src={"http://localhost:8080/"+book.imageURL} alt="" />
                </div>
              </div>
              <DialogFooter>
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