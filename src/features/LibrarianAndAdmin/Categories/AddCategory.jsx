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
import { PlusCircle } from "lucide-react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import toast from "react-hot-toast";

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
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Label>Name</Label>
                <Input
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
              <div>
                <Label>Starting Number</Label>
                <Input
                  {...register("startingNumber", {
                    required: "Please enter starting number!",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a number!",
                    },
                    min: {
                      value: 0,
                      message: "Please enter valid starting number!",
                    },
                    minLength: {
                      value: 1,
                      message: "Please enter atleast 1 character!",
                    },
                  })}
                />
                <p className="text-red-500">
                  {errors?.startingNumber?.message}
                </p>
              </div>
              <div>
                <Label>Ending Number</Label>
                <Input
                  {...register("endingNumber", {
                    required: "Please enter ending number!",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a number!",
                    },
                    min: {
                      value: 0,
                      message: "Please enter valid ending number!",
                    },
                    minLength: {
                      value: 1,
                      message: "Please enter atleast 1 character!",
                    },
                  })}
                />
                <p className="text-red-500">{errors?.endingNumber?.message}</p>
              </div>
              <div>
                <Label>Descriptoin</Label>
                <Input
                  type="text"
                  {...register("description", {
                    required: "Please enter description!",
                    minLength: {
                      value: 5,
                      message: "Please enter atleast 5 characters!",
                    },
                  })}
                />
                <p className="text-red-500">{errors?.description?.message}</p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button>Close</Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategory;
