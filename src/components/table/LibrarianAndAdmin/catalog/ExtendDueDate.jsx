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
import { BookOpenText, CircleArrowUp, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import toast from "react-hot-toast";

const ExtendDueDate = ({ id }) => {
  console.log(id);
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
        `/api/v1/la/borrow/extend/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Due date extended!");
      reset();
      refetchBorrowedBooks();
    } catch (error) {
      if (error.status === 404 || error.status === 400) {
        toast.error(error?.response?.data?.message);
      }

      if (error.status === 409) {
        toast.error(error?.response?.data?.message || "Conflict");
      }
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <CircleArrowUp size={20} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <BookOpenText size={27} />
              </div>
              <span className="text-lg">Extend Due Date</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-5" />
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-5">
            <div className="space-y-4 mb-7">
              <div className="space-y-1 px-1">
                <Label className="text-base font-medium pl-0.5">
                  Extend due date
                </Label>
                <Input
                  type="date"
                  placeholder="Select due date"
                  className="h-11 border border-gray-300 mb-0"
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
                {errors?.dueDate?.message && (
                  <p className="text-sm text-red-500 mt-0.5">
                    {errors?.dueDate?.message}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="grid grid-cols-2 mt-2 px-1">
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

export default ExtendDueDate;
