import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilLine, SquareLibrary } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";
import GlobalService from "@/services/GlobalServices";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const UpdateShelf = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [shelf, setShelf] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: shelfs, refetch: refetchShelfs } = useFetchShelfs();
  const { data: categories, refetch: refetchCategories } = useFetchCategory();

  useEffect(() => {
    const res = GLOBAL_SERVICE.get(`/api/v1/la/shelves/${id}`);
    res.then((response) => {
      setShelf(response.data);
    });
    
    if (shelf) {
      setValue("name", shelf.name || "");
      setValue("totalCapacity", shelf.totalCapacity || "");
      setValue("description", shelf.description || "");
    }
  }, [id, setValue]);
  
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(JSON.stringify(data));
    try {
      const response = await GlobalService.put(
        `/api/v1/la/shelves/${id}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Shelf updated.");
      setOpen(false);
      refetchShelfs();
    } catch (error) {
      if (error?.status === 409) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Please try again.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilLine size={20} />
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="sm:max-w-[500px]">
          <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
            <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
              <SquareLibrary size={27} />
            </div>
            <span className="text-lg">Update Shelf</span>
          </DialogTitle>
          <div className="my-0 h-px bg-gray-800 mx-5" />
        </DialogHeader>

        <ScrollArea className="mx-2 mb-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 px-3 mb-5">
              <div className="flex flex-col gap-1">
                <Label>Name</Label>
                <Input
                  type="text"
                  defaultValue={shelf?.name || ""}
                  className="col-span-3 border-gray-300 mb-0 h-11"
                  placeholder="Enter name"
                  {...register("name", {
                    required: "Please enter name.",
                    minLength: {
                      value: 3,
                      message: "Please enter at least 3 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Please enter no more than 100 characters.",
                    },
                  })}
                />
                <p className="text-sm text-red-500">{errors?.name?.message}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Capacity</Label>
                <Input
                  type="text"
                  defaultValue={shelf?.totalCapacity || ""}
                  className="col-span-3 border-gray-300 mb-0 h-11"
                  placeholder="Enter capacity"
                  {...register("capacity", {
                    required: "Please enter capacity.",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a number.",
                    },
                    min: {
                      value: 0,
                      message: "Please enter valid capacity",
                    },
                    minLength: {
                      value: 1,
                      message: "Please enter at least one number.",
                    },
                    maxLength: {
                      value: 9,
                      message:
                        "Please enter a number with no more than 9 digits.",
                    },
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors?.capacity?.message}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Category</Label>
                <select
                  name="categoryId"
                  onValueChange={(value) =>
                    setValue("categoryId", value, {
                      shouldValidate: true,
                    })
                  }
                  {...register("categoryId", {
                    required: "Please select a category.",
                  })}
                  className="w-[420px] border rounded-[8px] border-gray-300 mb-0 h-11"
                >
                  <option disabled>Please select a category</option>
                  {categories?.status == 200 &&
                    Array.isArray(categories?.data) &&
                    categories.data.length > 0 &&
                    categories?.data.map((element, index) => (
                      <option
                        key={element.categoryId || index}
                        value={element.categoryId}
                      >
                        {element.name}
                      </option>
                    ))}
                </select>
                <p className="text-sm text-red-500">
                  {errors?.categoryId?.message}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Label>Description</Label>
                <Input
                  type="text"
                  defaultValue={shelf?.description || ""}
                  className="col-span-3 border-gray-300 mb-0 h-11"
                  placeholder="Enter description"
                  {...register("description", {
                    required: "Please enter description.",
                    minLength: {
                      value: 3,
                      message: "Please enter at least 3 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Please enter no more than 50 characters.",
                    },
                  })}
                />
                <p className="text-sm text-red-500">
                  {errors?.description?.message}
                </p>
              </div>
              <DialogFooter className="grid grid-cols-4 mb-3">
                <DialogClose asChild>
                  <Button className="grid col-span-2">Clear</Button>
                </DialogClose>
                <Button type="submit" className="grid col-span-2">
                  Update
                </Button>
              </DialogFooter>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateShelf;
