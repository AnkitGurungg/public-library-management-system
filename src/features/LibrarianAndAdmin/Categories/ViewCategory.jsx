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
import { BookOpenText, Component, Eye, NotepadText } from "lucide-react";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import { Button } from "@/components/ui/button";

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
          <Eye size={20} />
        </DialogTrigger>

        <DialogContent aria-describedby={undefined} className="w-full">
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-2">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <Component size={27} />
              </div>
              <span className="text-lg">View Category</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-2" />
          </DialogHeader>

          {category ? (
            <div className="flex flex-col items-center justify-center">
              <div className="h-full flex flex-col gap-4 mx-2 border border-gray-300 rounded-xl w-full p-2 mb-0">
                <div>
                  <p>
                    {" "}
                    <strong>Name:</strong> {category.name}
                  </p>
                </div>

                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <p>
                      <strong>Starting Number:</strong>{" "}
                      {category.startingNumber}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      {" "}
                      <strong>Ending Number:</strong> {category.endingNumber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <p>
                      {" "}
                      <strong>Added Date:</strong> {category.addedDate}
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      {" "}
                      <strong>Updated Date:</strong> {category.updatedDate}
                    </p>
                  </div>
                </div>
                <div className="h-11 overflow-auto w-[400px]">
                  <p className="w-full">
                    <strong>Description:</strong> {category.description}
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
            <p className="mb-0">Does not exist</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewCategory;
