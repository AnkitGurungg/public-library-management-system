import { RefreshCw } from "lucide-react";
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
import { useFetchCategory } from "@/hooks/useFetchCategory";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import useFetchLibrarian from "@/hooks/useFetchLibrarian";
import toast from "react-hot-toast";

const RestoreBook = ({ id, name, type, whatUser }) => {
  const [open, setOpen] = useState(false);

  const { refetch: refetchBooks } = useFetchBooks();
  const { refetch: refetchCategories } = useFetchCategory();
  const { refetch: refetchShelfs } = useFetchShelfs();
  const { refetch: refetchVerifiedMembers } = useFetchVerifiedMembers();
  const { refetch: refetchNonVerifiedMembers } = useFetchNonVerifiedMembers();
  const { refetch: refetchLibrarians } = useFetchLibrarian();

  // handle the restore operation
  const handleRestore = async () => {
    let endpoint = "";
    try {
      if (type === "book") {
        endpoint = `/api/v1/la/books/restore/${id}`;
      }
      if (type === "category") {
        endpoint = `/api/v1/la/categories/restore/${id}`;
      }
      if (type === "shelf") {
        endpoint = `/api/v1/la/shelves/restore/${id}`;
      }
      if (type === "user" && whatUser === "member") {
        endpoint = `/api/v1/la/users/restore/${id}`;
      }
      if (type === "user" && whatUser === "librarian") {
        endpoint = `/api/v1/a/librarians/restore/${id}`;
      }

      if (endpoint) {
        const res = await GLOBAL_SERVICE.put(endpoint);
        console.log(res);
        setOpen(false);

        if (type === "book") {
          refetchBooks();
          toast.success("Book Restored!");
        }
        if (type === "category") {
          refetchCategories();
          refetchBooks();
          toast.success("Category Restored!");
        }
        if (type === "shelf") {
          refetchShelfs();
          toast.success("Shelf Restored!");
        }
        if (type === "user") {
          refetchVerifiedMembers();
          refetchNonVerifiedMembers();
          refetchLibrarians();
          toast.success("User Restored!");
        }
      }
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <RefreshCw size={20} />
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-2">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <RefreshCw size={27} />
              </div>
              <span className="text-lg">Restore Confirmation</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-2 mr-7" />
          </DialogHeader>
          <p className="ml-3">
            Are you sure want to procceed with the restoration of
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
          </p>
          <DialogFooter className="w-full mt-2">
            <Button onClick={handleRestore} className="w-full">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestoreBook;
