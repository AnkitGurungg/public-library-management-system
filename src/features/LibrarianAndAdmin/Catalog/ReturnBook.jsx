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
import { useEffect, useState } from "react";
import { useFetchBorrowedBooks } from "@/hooks/useFetchBorrowedBooks";
import useFetchOverdueBooks from "@/hooks/useFetchOverdueBooks";
import toast from "react-hot-toast";

const ReturnBook = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data: borrowBooks, refetch: refetchBorrowedBooks } =
    useFetchBorrowedBooks();
  const {
    data: overdueBooks,
    refetch: refetchOverdueBooks,
    isLoading,
    error,
  } = useFetchOverdueBooks();

  useEffect(() => {
    console.log("useeffect id is:", id);
  }, [id]);

  const handleReturnBook = async () => {
    try {
      const response = await GlobalService.get(`/api/v1/la/return/add/${id}`);
      refetchOverdueBooks();
      refetchBorrowedBooks();
      setOpen(false);
      toast.success("Book returned!");
      console.log(response);
    } catch (error) {
      if (error.status === 409) {
        toast.error("Coflict, this book is already returned");
      }
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <RotateCwIcon size={20} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-5">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <RotateCwIcon size={27} />
              </div>
              <span className="text-lg">Return Book</span>
            </DialogTitle>
          </DialogHeader>
          <div className="my-0 h-px bg-gray-800 mx-5" />
          <p className="mx-6">
            Are you sure want to procceed with the return operation
          </p>
          <DialogFooter className="w-full mt-3 pl-3">
            <Button onClick={handleReturnBook} className="w-full">
              Return
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReturnBook;
