import { Button } from "@/components/ui/button";
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
import { Eye, NotepadText, SquareLibrary } from "lucide-react";
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
          <Eye size={20} />
        </DialogTrigger>

        <DialogContent aria-describedby={undefined}>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-2">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <SquareLibrary size={27} />
              </div>
              <span className="text-lg">View Shelf</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-2" />
          </DialogHeader>
          {shelf ? (
            <div className="flex flex-col items-center justify-center">
              <div className="h-full flex flex-col gap-4 border border-gray-300 rounded-xl w-full p-2 mb-0">
                <div>
                  <p>
                    {" "}
                    <strong>Name:</strong> {shelf.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <p>
                      <strong>Category:</strong> {shelf.category.name}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      <strong>Capacity:</strong> {shelf.capacity}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <p>
                      <strong>Added Date:</strong> {shelf.addedDate}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      <strong>Updated Date:</strong> {shelf.updatedDate}
                    </p>
                  </div>
                </div>

                <div className="h-11 overflow-auto w-[400px]">
                  <p className="w-full">
                    <strong>Description:</strong> {shelf.description}
                  </p>
                </div>
              </div>
              <DialogFooter className="w-full mt-2">
                <DialogClose className="w-full">
                  <Button className="w-full">Close</Button>
                </DialogClose>
              </DialogFooter>
            </div>
          ) : (
            <p>Does not exist</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewShelf;
