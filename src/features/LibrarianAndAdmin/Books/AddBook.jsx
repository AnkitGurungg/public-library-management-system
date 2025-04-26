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
import { BookOpenText, PlusCircle } from "lucide-react";
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
          toast.error(error?.response?.data?.message);
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
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <BookOpenText size={27} />
              </div>
              <span className="text-lg">Add Book</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-5" />
          </DialogHeader>
          <ScrollArea className="h-[70vh] mx-2 mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 px-3 mb-5">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="isbn" className="text-right">
                    ISBN
                  </Label>
                  <Input
                    id="isbn"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter isbn"
                    {...register("isbn", {
                      required: "Please enter isbn.",
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
                  {errors?.isbn?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.isbn?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter title"
                    {...register("title", {
                      required: "Please enter title.",
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Please enter no more than 100 characters.",
                      },
                    })}
                  />
                  {errors?.title?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.title?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="title" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="author"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter author"
                    {...register("author", {
                      required: "Please enter author.",
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Please enter no more than 100 characters.",
                      },
                    })}
                  />
                  {errors?.author?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.author?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>

                  <select
                    onChange={(e) => setValue("categoryId", e.target.value)}
                    {...register("categoryId", {
                      required: "Please select a category.",
                    })}
                    className="w-[420px] border rounded-[8px] border-gray-300 mb-0 h-11"
                  >
                    <option disabled>Please select a category</option>
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

                  {errors?.categoryId?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.categoryId?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="shelf" className="text-right">
                    Shelf
                  </Label>

                  <select
                    onChange={(e) => setValue("shelfId", e.target.value)}
                    {...register("shelfId", {
                      required: "Please select a shelf.",
                    })}
                    className="w-[420px] border rounded-[8px] border-gray-300 mb-0 h-11"
                  >
                    <option disabled>Please select a shelf</option>
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
                  {errors?.shelfId?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.shelfId?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="language" className="text-right">
                    Language
                  </Label>
                  <Input
                    id="language"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter language"
                    {...register("language", {
                      required: "Please enter langauge.",
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Please enter no more than 100 characters.",
                      },
                    })}
                  />
                  {errors?.language?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.language?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="published-date" className="text-right">
                    Published Date
                  </Label>
                  <Input
                    id="published-date"
                    type="date"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Choose published date"
                    {...register("publishedDate", {
                      required: "Please select a date.",
                      // validate: (value) => {
                      //   const selectedDate = new Date(value);
                      //   const today = new Date();
                      //   today.setHours(0, 0, 0, 0);
                      //   return (
                      //     selectedDate >= today || "Date must be today or later"
                      //   );
                      // },
                    })}
                  />
                  {errors?.publishedDate?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.publishedDate?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="edition" className="text-right">
                    Edition
                  </Label>
                  <Input
                    id="edition"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter edition"
                    {...register("edition", {
                      required: "Please enter edition.",
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters.",
                      },
                      maxLength: {
                        value: 15,
                        message: "Please enter no more than 100 characters.",
                      },
                    })}
                  />
                  {errors?.edition?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.edition?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="page-count" className="text-right">
                    Page Count
                  </Label>
                  <Input
                    id="page-count"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter page count"
                    {...register("pageCount", {
                      required: "Enter a page count.",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number.",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid page count.",
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
                  {errors?.pageCount?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.pageCount?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter quantity"
                    {...register("quantity", {
                      required: "Please enter quantity.",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number.",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid quantity.",
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
                  {errors?.quantity?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.quantity?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="per-book-cost" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="per-book-cost"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter price"
                    {...register("price", {
                      required: "Please enter price.",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number.",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid price.",
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
                  {errors?.price?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.price?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="image" className="text-right">
                    Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    defaultValue=""
                    className="col-span-3 h-11 border border-gray-300"
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
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter description."
                    {...register("description", {
                      required: "Please enter description.",
                      minLength: {
                        value: 3,
                        message: "Please enter at least 3 characters.",
                      },
                      maxLength: {
                        value: 100,
                        message: "Please enter no more than 100 characters.",
                      },
                    })}
                  />
                  {errors?.description?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.description?.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter className="grid grid-cols-4 mx-2 mb-3">
                <DialogClose asChild>
                  <Button className="grid col-span-2">Clear</Button>
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
