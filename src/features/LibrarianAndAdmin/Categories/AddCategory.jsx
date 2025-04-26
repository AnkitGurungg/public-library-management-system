import { useFetchCategory } from "@/hooks/useFetchCategory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { BookOpenText, Component, PlusCircle } from "lucide-react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { data: categories, refetch: refetchCategories } = useFetchCategory();

  const onSubmit = async (data) => {
    try {
      const respose = await GLOBAL_SERVICE.post(
        "/api/v1/la/category/add",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      reset();
      refetchCategories();
      toast.success("Category added!");
    } catch (error) {
      if (error?.status === 409) {
        toast.error(error?.response?.data?.message || "Try again!");
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle></PlusCircle>
            Add Category
          </Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          {/* <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader> */}
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <Component size={27} />
              </div>
              <span className="text-lg">Add Category</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-5" />
          </DialogHeader>
          <ScrollArea className="mx-2 mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 px-3 mb-5">
                <div className="flex flex-col gap-1">
                  <Label>Name</Label>
                  <Input
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter name"
                    {...register("name", {
                      required: "Please enter name!",
                      minLength: {
                        value: 5,
                        message: "Please enter atleast 5 characters!",
                      },
                    })}
                  />
                  <p className="text-red-500">{errors?.name?.message}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Starting Number</Label>
                  <Input
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter starting number"
                    {...register("startingNumber", {
                      required: "Please enter starting number.",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number.",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid starting number.",
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
                  <p className="text-red-500">
                    {errors?.startingNumber?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Ending Number</Label>
                  <Input
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter ending number"
                    {...register("endingNumber", {
                      required: "Please enter ending number.",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number.",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid ending number.",
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
                  <p className="text-red-500">
                    {errors?.endingNumber?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Description</Label>
                  <Input
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter description"
                    type="text"
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
                  <p className="text-red-500">{errors?.description?.message}</p>
                </div>
              </div>
              <DialogFooter className="grid grid-cols-4 mx-2 mb-3">
                <DialogClose className="grid col-span-2">
                  <Button className="">Clear</Button>
                </DialogClose>
                <Button type="submit" className="grid col-span-2">
                  Add
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
