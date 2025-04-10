import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { NotepadText } from "lucide-react";
import { useFetchCategory } from "@/hooks/useFetchCategory";

const ViewCategory = ({ id }) => {
  const BACKEND_SERVER_BASE_URL = "http://localhost:8080/";
  const { data: categories } = useFetchCategory();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (categories?.data && Array.isArray(categories.data)) {
      const foundCategory = categories.data.find(
        (element) => element.categoryId === id
      );
      setCategory(foundCategory || null);
    }
  }, [categories, id]);

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
              View Category
            </DialogTitle>
          </DialogHeader>
          <hr className="border border-black " />
          {category ? (
            <div className="w-full h-full flex flex-col gap-4">
              <div>
                <p>Name: {category.name}</p>
              </div>

              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p>Starting Number: {category.startingNumber}</p>
                </div>
                <div className="col-span-1">
                  <p>Ending Number: {category.endingNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <p>Added Date: {category.addedDate}</p>
                </div>
                <div className="col-span-1">
                  <p>Updated Date: {category.updatedDate}</p>
                </div>
              </div>
              <div>
                <p>Description: {category.description}</p>
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

export default ViewCategory;
