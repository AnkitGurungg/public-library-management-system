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
import GlobalService from "@/services/GlobalServices";
import { useState } from "react";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import { Trash2 } from "lucide-react";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";

const Delete = ({ id, name, type }) => {
  const { data: books, refetch: refetchBooks } = useFetchBooks();
  const { data: categories, refetch: refetchCategories } = useFetchCategory();
  const { data: shelfs, refetch: refetchShelfs } = useFetchShelfs();

  const [open, setOpen] = useState(false);

  // handles the delete operation
  const handleDelete = async () => {
    let endpoint = "";
    try {
      if (type === "book") {
        endpoint = `/api/book/delete/${id}`;
      }
      if (type === "category") {
        endpoint = `/api/category/delete/${id}`;
      }
      if (type === "shelf") {
        endpoint = `/api/shelf/delete/${id}`;
      }

      if (endpoint) {
        const res = await GlobalService.delete(endpoint);
        console.log(res);
        setOpen(false);

        if (type === "book") {
          refetchBooks();
        }
        if (type === "category") {
          refetchCategories();
          refetchBooks();
        }
        if (type === "shelf") {
          refetchShelfs(); 
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash2 />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Delete Confirmation</DialogTitle>
        </DialogHeader>
        <hr />
        <p>
          Are you sure want to procceed with the deletion of
          {type === "book" && <p>{type} {name} in id {id}?</p>}
          {type === "category" && <p>{type} {name} in id {id}?</p>}
          {type === "shelf" && <p>{type} {name} in id {id}?</p>}
        </p>
        <DialogFooter>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;