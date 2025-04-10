import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";
import { NotepadText } from "lucide-react";
import { useState, useEffect } from "react";

const ViewShelf = ({ id }) => {
  const { data: shelfs, refetch: refetchShelfs } = useFetchShelfs();
  const [shelf, setShelf] = useState(null);

  useEffect(() => {
    if (shelfs?.data && Array.isArray(shelfs.data)) {
      const foundShelf = shelfs.data.find((element) => element.shelfId === id);
      setShelf(foundShelf || null);
    }
  }, [shelfs, id]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <NotepadText />
        </DialogTrigger>

        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex flex-row justify-items-start items-center gap-2">
              <NotepadText />
              View Shelf
            </DialogTitle>
          </DialogHeader>
          <hr className="border border-black " />
          {shelf ? (
            <div className="w-full h-full flex flex-col gap-4">
              <div>
                <p>Name: {shelf.name}</p>
              </div>

              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p>Category: {shelf.category.name}</p>
                </div>
                <div className="col-span-1">
                  <p>Capacity: {shelf.capacity}</p>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p>Added Date: {shelf.addedDate}</p>
                </div>
                <div className="col-span-1">
                  <p>Updated Date: {shelf.updatedDate}</p>
                </div>
              </div>

              <div>
                <p>Description: {shelf.description}</p>
              </div>
            </div>
          ) : (
            <p>Does not exist</p>
          )}
          <hr />
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewShelf;
