import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import GlobalService from "@/services/GlobalServices";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";

const AddShelf = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { data: shelfs, refetch: refetchShelfs } = useFetchShelfs();
  const { data: categories, refetch: refetchCategories } = useFetchCategory();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    try {
      const response = await GlobalService.post(
        "/api/shelf/add",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      reset();
      refetchShelfs();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Shelf</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Shelf</DialogTitle>
        </DialogHeader>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Enter name"
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
              placeholder="Enter capacity"
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
              onValueChange={(value) =>
                setValue("categoryId", value, { shouldValidate: true })
              }
              {...register("categoryId", {
                required: "Please select at least one",
              })}
              required
              className="border-2 rounded-[7px] h-[40px] w-[460px]"
            >
              <option disabled>Select a category</option>
              {categories?.status == 200 &&
                categories?.data.map((element, index) => (
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
              placeholder="Type here"
              {...register("description", {
                required: "Please enter description!",
                minLength: {
                    value: 5,
                    message: "Please enter atleast 5 characters!"
                }
              })}
            />
            <p>{errors?.description?.message}</p>
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
  );
};

export default AddShelf;
