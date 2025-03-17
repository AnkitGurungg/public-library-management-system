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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import GlobalService from "@/services/GlobalServices";

const UpdateCategory = ({ id }) => {
  const { data: categories, refetch: refetchCategories } = useFetchCategory();
  const [open, setOpen] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const selectedCategory = categories?.data?.find((category) => category.categoryId === id);
    if (selectedCategory) {
      setValue("name", selectedCategory.name || "");
      setValue("startingNumber", selectedCategory.startingNumber || "");
      setValue("endingNumber", selectedCategory.endingNumber || "");
      setValue("description", selectedCategory.description || "");
    }
  }, [categories, id, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    try {
      const response = await GlobalService.put(
        `/api/category/update/${id}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOpen(false);
      refetchCategories();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <PencilLine />
        </DialogTrigger>

        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
            <hr />
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            {categories?.data
              ?.filter((category) => category.categoryId == id)
              .map((element, index) => (
                <div key={element.categoryId || index}>
                  <div>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      {...register("name", {
                        required: "Please enter name!",
                        minLength: {
                          value: 5,
                          message: "Please enter atleast 5 characters!",
                        },
                      })}
                    />
                    <p>{errors?.name?.message}</p>
                  </div>
                  <div>
                    <Label>Starting Number:</Label>
                    <Input
                      type="text"
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
                    <p>{errors?.startingNumber?.message}</p>
                  </div>
                  <div>
                    <Label>Ending Number:</Label>
                    <Input
                      type="text"
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
                    <p>{errors?.endingNumber?.message}</p>
                  </div>
                  <div>
                    <Label>Description</Label>
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
                    <p>{errors?.description?.message}</p>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button>Close</Button>
                    </DialogClose>
                    <Button type="submit">Update</Button>
                  </DialogFooter>
                </div>
              ))}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateCategory;