import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CornerDownLeft } from "lucide-react";
import { RotateCwIcon } from "lucide-react";
import GlobalService from "@/services/GlobalServices";
import { useFetchBorrowedBooks } from "@/components/hooks/useFetchBorrowedBooks";
import { useEffect, useState } from "react";

const ReturnBook = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data: borrowBooks, refetch: refetchBorrowedBooks } =
    useFetchBorrowedBooks();
    console.log("return id:", id)

    useEffect(() => {
        console.log("useeffect id is:", id)
    }, [id])

  const handleReturnBook = async () => {
    try {
      const response = await GlobalService.get(`/api/return/add/${id}`);
      console.log("response is:", response)
      console.log("id is:", id)
      refetchBorrowedBooks();
      setOpen(false);
      console.log(response);
    } catch (error) {
        if(error.status===409){
            alert("Coflict, this book is already returned")
        }
      console.log(error);
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <RotateCwIcon className="border-b-2" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-row gap-1">
              <CornerDownLeft />
              Return Book
            </DialogTitle>
          </DialogHeader>
          <hr />
          <p>Are you sure want to procceed with the return operation</p>
          <DialogFooter>
            <Button onClick={handleReturnBook}>Return</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReturnBook;