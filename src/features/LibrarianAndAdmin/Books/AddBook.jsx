import { useFetchCategory } from "@/hooks/useFetchCategory";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import toast from "react-hot-toast";
import useFetchDisplayCategory from "@/hooks/useFetchDisplayCategory";
import { useFetchShelfs } from "@/hooks/useFetchShelfs";
import { useFetchAvailableShelfs } from "@/hooks/useFetchAvailableShelfs";

const AddBook = () => {
  const { data: categories, refetch: refetchCategories } =
    useFetchDisplayCategory();
  const { data: books, refetch: refetchBooks } = useFetchBooks();
  const { data: availableShelfs, refetch: refetchAvailableShelfs } =
    useFetchAvailableShelfs();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [bookImage, setBookImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handle the book image
  const handleBookImage = (e) => {
    setBookImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (!bookImage || bookImage === null) {
      setError("Select at least one");
      return;
    } else {
      formData.append("bookImage", bookImage);
      formData.append(
        "bookRequestDto",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      try {
        setLoading(true);
        const response = await GLOBAL_SERVICE.post(
          "/api/v1/la/book/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        reset();
        refetchBooks();
        toast.success("Book added");
      } catch (error) {
        if (error?.status === 409) {
          toast.error(error?.response?.data?.message)
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading && <LoadingComponent />}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="opacity-90">
            <PlusCircle></PlusCircle>
            Add Book
          </Button>
        </DialogTrigger>
        <DialogContent className="w-390" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
          </DialogHeader>
          <hr />
          <ScrollArea className="h-[70vh]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 px-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="isbn" className="text-right">
                    ISBN
                  </Label>
                  <Input
                    id="isbn"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("isbn", {
                      required: "Please enter ISBN",
                      minLength: {
                        value: 5,
                        message: "Max lenght should be 5",
                      },
                      maxLength: {
                        value: 20,
                        message: "Max lenght should be 20",
                      },
                    })}
                  />
                  <p>{errors?.isbn?.message}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("title", {
                      required: "Please enter title",
                      minLength: {
                        value: 1,
                        message: "Mininmum length is required",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max length should be 50",
                      },
                    })}
                  />
                  <p>{errors?.title?.message}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="title" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="author"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("author", {
                      required: "Please enter author name",
                      minLength: {
                        value: 1,
                        message: "Minimun length is required",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max length should be 50",
                      },
                    })}
                  />
                  <p>{errors?.author?.message}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>

                  <select
                    onChange={(e) => setValue("categoryId", e.target.value)}
                    {...register("categoryId", {
                      required: "Please select at least one",
                    })}
                    className="w-[340px] h-[39px] border-2 rounded-[8px]"
                  >
                    <option disabled>Please select atleast one category</option>
                    {categories?.status == 200 &&
                      Array.isArray(categories?.data) &&
                      categories?.data?.length > 0 &&
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
                  <Label htmlFor="shelf" className="text-right">
                    Shelf
                  </Label>

                  <select
                    onChange={(e) => setValue("shelfId", e.target.value)}
                    {...register("shelfId", {
                      required: "Please select at least one",
                    })}
                    className="w-[340px] h-[39px] border-2 rounded-[8px]"
                  >
                    <option disabled>Please select atleast one shelf</option>
                    {availableShelfs?.status == 200 &&
                      Array.isArray(availableShelfs?.data) &&
                      availableShelfs?.data?.length > 0 &&
                      availableShelfs?.data.map((element, index) => (
                        <option
                          key={element.shelfId || index}
                          value={element.shelfId}
                        >
                          {element.name}
                        </option>
                      ))}
                  </select>
                  <p className="text-sm text-red-500">
                    {errors?.shelfId?.message}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="language" className="text-right">
                    Language
                  </Label>
                  <Input
                    id="language"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("language", {
                      required: "Please enter is langauge",
                      minLength: {
                        value: 1,
                        message: "Minimum length is required",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max length should be 50",
                      },
                    })}
                  />
                  <p>{errors?.language?.message}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="published-date" className="text-right">
                    Published Date
                  </Label>
                  <Input
                    id="published-date"
                    type="date"
                    defaultValue=""
                    className="col-span-3"
                    {...register("publishedDate", {
                      required: "Date is required",
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
                  <p>{errors?.publishedDate?.message}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="edition" className="text-right">
                    Edition
                  </Label>
                  <Input
                    id="edition"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("edition", {
                      required: "Please enter edition",
                      minLength: {
                        value: 1,
                        message: "Min length is required",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max length should be 50",
                      },
                    })}
                  />
                  <p>{errors?.edition?.message}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="page-count" className="text-right">
                    Page Count
                  </Label>
                  <Input
                    id="page-count"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("pageCount", {
                      required: "Enter a number",
                      pattern: {
                        value: /^\d+$/,
                        message: "Only numbers are allowed",
                      },
                      min: {
                        value: 0,
                        message: "Page number can not be negative",
                      },
                    })}
                  />
                  <p>{errors?.pageCount?.message}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("quantity", {
                      required: "Please enter quantity",
                      pattern: {
                        value: /^\d+$/,
                        message: "Only numbers are allowed",
                      },
                      min: {
                        value: 0,
                        message: "Quantity is can not be negative",
                      },
                    })}
                  />
                  {errors?.quantity?.message}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="per-book-cost" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="per-book-cost"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("price", {
                      required: "Please enter price",
                      pattern: {
                        value: /^\d+$/,
                        message: "Only numbers are allowed",
                      },
                      min: {
                        value: 0,
                        message: "Price can not be negative",
                      },
                    })}
                  />
                  <p>{errors?.price?.message}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    defaultValue=""
                    className="col-span-3"
                    onChange={handleBookImage}
                    accept="image/jpeg, image/png"
                    required
                  />
                  <p>{error}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    type="text"
                    defaultValue=""
                    className="col-span-3"
                    {...register("description", {
                      required: "Please enter description",
                      minLength: {
                        value: 1,
                        message: "Min length is required",
                      },
                    })}
                  />
                </div>
              </div>
              <DialogFooter className="grid grid-cols-4">
                <DialogClose asChild>
                  <Button className="grid col-span-2">Close</Button>
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

export default AddBook;
