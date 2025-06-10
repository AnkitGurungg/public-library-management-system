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
import { RotateCwIcon } from "lucide-react";
import GlobalService from "@/services/GlobalServices";
import { useEffect, useState } from "react";
import { useFetchBorrowedBooks } from "@/hooks/useFetchBorrowedBooks";
import useFetchOverdueBooks from "@/hooks/useFetchOverdueBooks";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const ReturnBook = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { refetch: refetchBorrowedBooks } = useFetchBorrowedBooks();
  const { refetch: refetchOverdueBooks } = useFetchOverdueBooks();

  useEffect(() => {
    // console.log("Return bookId:", id);
  }, [id]);

  const handleReturnBook = async () => {
    try {
      setIsSubmitting(true);
      const response = await GlobalService.post(`/api/v1/la/returns/${id}`);
      refetchOverdueBooks();
      refetchBorrowedBooks();
      setOpen(false);
      toast.success("Book returned!");
      console.log(response);

    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        toast.error(error?.response?.data?.message || "Please try again.");
      }
      if (error.status === 409) {
        toast.error("Coflict, this book is already returned");
      }
    } finally {
      setIsSubmitting(false);
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
            Are you sure want to procceed with the return operation ?
          </p>
          <DialogFooter className="w-full mt-3 pl-3">
            <Button
              onClick={handleReturnBook}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <CgSpinner className="animate-spin text-[40px]" />
                </span>
              ) : (
                "Return"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReturnBook;
