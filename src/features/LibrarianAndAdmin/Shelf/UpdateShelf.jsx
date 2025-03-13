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
import { PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";
import GlobalService from "@/services/GlobalServices";

const UpdateShelf = ({ id }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const { data: shelfs, refetch: refetchShelfs } = useFetchShelfs();
  const { data: categories, refetch: refetchCategories } = useFetchCategory();
  console.log(shelfs);

  useEffect(() => {
    const selectedShelf = shelfs?.data?.find((shelf) => shelf.shelfId === id);
    if (selectedShelf) {
      setValue("name", selectedShelf.name || "");
      setValue("capacity", selectedShelf.capacity || "");
      setValue("description", selectedShelf.description || "");
    }
  }, [shelfs, id, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    try {
      const response = await GlobalService.put(
        `/api/shelf/update/${id}`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOpen(false)
      refetchShelfs()
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilLine />
      </DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Shelf</DialogTitle>
          <hr />
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {shelfs?.data
            ?.filter((shelf) => shelf.shelfId == id)
            .map((element, index) => (
              <div key={element.shelfId || index}>
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
                  <Label>Capacity</Label>
                  <Input
                    type="text"
                    {...register("capacity", {
                      required: "Please enter capacity!",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number!",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid capacity!",
                      },
                      minLength: {
                        value: 1,
                        message: "Please enter atleast 1 character!",
                      },
                    })}
                  />
                  <p>{errors?.capacity?.message}</p>
                </div>

                <div>
                  <Label>Category</Label>
                  <select
                    name="categoryId"
                    required
                    className="border-2 w-115 h-9 rounded-[8px]"
                    onChange={(value) => setValue("categoryId", value)}
                    {...register("categoryId")}
                  >
                    <option disabled>Select a Category</option>
                    {categories?.data?.map((element, index) => (
                      <option
                        key={element.categoryId || index}
                        value={element.categoryId}
                      >
                        {element.name}
                      </option>
                    ))}
                  </select>
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
  );
};

export default UpdateShelf;