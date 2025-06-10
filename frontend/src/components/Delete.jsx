import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useState } from "react";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import { Trash, Trash2 } from "lucide-react";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import useFetchLibrarian from "@/hooks/useFetchLibrarian";
import toast from "react-hot-toast";
import { useFetchBorrowedBooks } from "@/hooks/useFetchBorrowedBooks";
import { CgSpinner } from "react-icons/cg";

const Delete = ({ id, name, type }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { refetch: refetchBooks } = useFetchBooks();
  const { refetch: refetchCategories } = useFetchCategory();
  const { refetch: refetchShelfs } = useFetchShelfs();
  const { refetch: refetchVerifiedMembers } = useFetchVerifiedMembers();
  const { refetch: refetchNonVerifiedMembers } = useFetchNonVerifiedMembers();
  const { refetch: refetchLibrarians } = useFetchLibrarian();
  const { refetch: refetchBorrowedBooks } = useFetchBorrowedBooks();

  // handle the delete operation
  const handleDelete = async () => {
    let endpoint = "";
    setIsSubmitting(true);
    try {
      if (type === "book") {
        endpoint = `/api/v1/la/books/${id}`;
      }
      if (type === "category") {
        endpoint = `/api/v1/la/categories/${id}`;
      }
      if (type === "shelf") {
        endpoint = `/api/v1/la/shelves/${id}`;
      }
      if (type === "user") {
        endpoint = `/api/v1/la/users/${id}`;
      }
      if (type === "borrowed") {
        endpoint = `/api/v1/la/borrows/${id}`;
      }

      if (endpoint) {
        const res = await GLOBAL_SERVICE.delete(endpoint);
        console.log(res);
        setOpen(false);

        if (type === "book") {
          toast.success("Book deleted!");
          refetchBooks();
        }
        if (type === "category") {
          toast.success("Category deleted!");
          refetchCategories();
          refetchBooks();
        }
        if (type === "shelf") {
          toast.success("Shelf deleted!");
          refetchShelfs();
        }
        if (type === "user") {
          toast.success("User deleted!");
          refetchVerifiedMembers();
          refetchNonVerifiedMembers();
          refetchLibrarians();
        }
        if (type === "borrowed") {
          toast.success("Borrow record deleted!");
          refetchBorrowedBooks();
        }
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to send mail please try again."
        );
      }
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash2 size={20} />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="sm:max-w-[500px]">
          <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-2">
            <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
              <Trash size={27} />
            </div>
            <span className="text-lg">Delete Confirmation</span>
          </DialogTitle>
          <div className="my-0 h-px bg-gray-800 mx-2 mr-7" />
        </DialogHeader>
        <p className="ml-3">
          Are you sure want to procceed with the deletion of
          {type === "book" && (
            <p>
              {type} {name} ?
            </p>
          )}
          {type === "category" && (
            <p>
              {type} {name} ?
            </p>
          )}
          {type === "shelf" && (
            <p>
              {type} {name} ?
            </p>
          )}
          {type === "user" && (
            <p>
              {type} {name} ?
            </p>
          )}
          {type === "borrowed" && (
            <p>
              {type} {name} ?
            </p>
          )}
        </p>
        <DialogFooter className="w-full mt-2">
          <Button
            onClick={handleDelete}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <CgSpinner className="animate-spin text-[40px]" />
              </span>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
