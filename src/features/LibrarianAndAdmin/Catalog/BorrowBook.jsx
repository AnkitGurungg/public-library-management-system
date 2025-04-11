import { useFetchBorrowedBooks } from "@/hooks/useFetchBorrowedBooks";
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
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import toast from "react-hot-toast";

const BorrowBook = () => {
  const [show, setShow] = useState(false);
  const { data: borrowedBooks, refetch: refetchBorrowedBooks } =
    useFetchBorrowedBooks();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await GLOBAL_SERVICE.post(
        "/api/v1/la/borrow/add",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      reset();
      refetchBorrowedBooks();
      (response.status === 201 || response.status === 201) &&
        toast.success("Borrow succeed!");
    } catch (error) {
      if (error.status === 404 || error.status === 400) {
        toast.error(error?.response?.data?.message);
      }
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>
            <PlusCircle></PlusCircle>
            Borrow Book
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
          </DialogHeader>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Label>Book Id</Label>
                <Input
                  type="text"
                  {...register("bookId", {
                    required: "Please enter book id!",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a number!",
                    },
                    min: {
                      value: 0,
                      message: "Please enter valid book id!",
                    },
                    minLength: {
                      value: 1,
                      message: "Please enter atleast 1 character!",
                    },
                  })}
                />
                <p>{errors?.bookId?.message}</p>
              </div>

              <div>
                <Label>User Id</Label>
                <Input
                  type="text"
                  {...register("userId", {
                    required: "Please enter user id!",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a number!",
                    },
                    min: {
                      value: 0,
                      message: "Please enter valid user id!",
                    },
                    minLength: {
                      value: 1,
                      message: "Please enter atleast 1 character!",
                    },
                  })}
                />
                <p>{errors?.userId?.message}</p>
              </div>
              <div>
                <Label>Due date</Label>
                <Input
                  type="date"
                  {...register("dueDate", {
                    required: "Please choose due date!",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return (
                        selectedDate >= today || "Date must be today or later"
                      );
                    },
                  })}
                />
                <p>{errors?.dueDate?.message}</p>
              </div>
              <div>
                <Label>Note</Label>
                <Input
                  type="text"
                  {...register("note", {
                    required: "Please enter description!",
                    minLength: {
                      value: 5,
                      message: "Please enter atleast 5 characters!",
                    },
                  })}
                />
                <p>{errors?.note?.message}</p>
              </div>
            </div>

            <DialogFooter className="grid grid-cols-2 mt-2">
              <Button className="w-full" onClick={() => reset()}>
                Clear
              </Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowBook;
