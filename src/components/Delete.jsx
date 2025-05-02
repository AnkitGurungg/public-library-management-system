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

const Delete = ({ id, name, type }) => {
  const { data: books, refetch: refetchBooks } = useFetchBooks();
  const { data: categories, refetch: refetchCategories } = useFetchCategory();
  const { data: shelfs, refetch: refetchShelfs } = useFetchShelfs();
  const { data: VerifiedMembers, refetch: refetchVerifiedMembers } =
    useFetchVerifiedMembers();
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();
  const { data: librarian, refetch: refetchLibrarians } = useFetchLibrarian();
  const { data: borrowedBooks, refetch: refetchBorrowedBooks } =
    useFetchBorrowedBooks();

  const [open, setOpen] = useState(false);

  // handles the delete operation
  const handleDelete = async () => {
    let endpoint = "";
    try {
      if (type === "book") {
        endpoint = `/api/v1/la/book/delete/${id}`;
      }
      if (type === "category") {
        endpoint = `/api/v1/la/category/delete/${id}`;
      }
      if (type === "shelf") {
        endpoint = `/api/v1/la/shelf/delete/${id}`;
      }
      if (type === "user") {
        endpoint = `/api/v1/la/user/delete/${id}`;
      }
      if (type === "borrowed") {
        endpoint = `/api/v1/la/borrow/delete/${id}`;
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
      console.log(error);
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
              {type} {name} in id {id} ?
            </p>
          )}
          {type === "category" && (
            <p>
              {type} {name} in id {id} ?
            </p>
          )}
          {type === "shelf" && (
            <p>
              {type} {name} in id {id} ?
            </p>
          )}
          {type === "user" && (
            <p>
              {type} {name} in id {id} ?
            </p>
          )}
          {type === "borrowed" && (
            <p>
              {type} {name} in id {id} ?
            </p>
          )}
        </p>
        <DialogFooter className="w-full mt-2">
          <Button onClick={handleDelete} className="w-full">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
