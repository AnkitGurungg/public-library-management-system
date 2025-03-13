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
import GlobalService from "@/services/GlobalServices";
import { useForm } from "react-hook-form";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const {data: categories, refetch: refetchCategories} = useFetchCategory();

  const onSubmit = async (data) => {

    try{
        const respose = await GlobalService.post("/api/category/add", JSON.stringify(data), {
            headers: {
                "Content-Type" : "application/json"
            }
        })
        reset()
        refetchCategories()

        console.log(respose)
    } catch(error){
        alert(error)
        console.log(error)
    }

  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>Add Category</Button>
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
                <p className="text-red-500">{errors?.startingNumber?.message}</p>
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