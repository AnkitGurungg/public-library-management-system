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
import { BookOpenText, Eye } from "lucide-react";
import { useState } from "react";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { Button } from "@/components/ui/button";
import { useFetchBookById } from "@/hooks/useFetchBookById";

const ViewBook = ({ id }) => {
  const [open, setOpen] = useState(false);

  const { data: book, isLoading } = useFetchBookById(id, open);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Eye size={20} />
        </DialogTrigger>

        <DialogContent className="w-full" aria-describedby={undefined}>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-2">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <BookOpenText size={27} />
              </div>
              <span className="text-lg">View Book</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-2" />
          </DialogHeader>
          {book ? (
            <div className="flex items-center justify-center">
              <ScrollArea className="flex items-center justify-center gap-0">
                <div className="grid grid-cols-2 gap-1 border border-gray-300 rounded-xl w-full p-2">
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
                      <strong>Category:</strong> {book.categoryName}
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
                      <strong>Quantity:</strong> {book.quantity}
                    </p>
                    <p>
                      <strong>Price:</strong> {book.price}
                    </p>
                    <p>
                      <strong>Published Date:</strong> {book.publishedDate}
                    </p>
                    <p>
                      <strong>Added Date:</strong> {book.addedDate}
                    </p>

                    <div className="h-11 overflow-auto w-[450px]">
                      <p className="w-full">
                        <strong>Description:</strong> {book.description}
                      </p>
                    </div>
                  </div>
                  <div className="max-h-96">
                    <img
                      src={`${BACKEND_SERVER_BASE_URL}/${book.imageURL}`}
                      alt={book.title}
                      className="object-cover w-48 ml-3"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-2">
                  <DialogClose className="w-full">
                    <Button className="w-full">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </ScrollArea>
            </div>
          ) : (
            <p>Does not exist</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewBook;
