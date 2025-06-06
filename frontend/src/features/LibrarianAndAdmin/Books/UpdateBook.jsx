import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { BookOpenText, PencilLine } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalService from "@/services/GlobalServices";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import useFetchDisplayCategory from "@/hooks/useFetchDisplayCategory";
import { useFetchAvailableShelfs } from "@/hooks/useFetchAvailableShelfs";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const UpdateBook = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(null);
  const [bookImage, setBookImage] = useState(null);

  const { refetch: refetchBooks } = useFetchBooks();
  const { data: categories, refetch: refetchCategories } =
    useFetchDisplayCategory();
  const { data: availableShelfs, refetch: refetchAvailableShelfs } =
    useFetchAvailableShelfs();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    const res = GLOBAL_SERVICE.get(`/api/v1/la/books/${id}`);
    res.then((response) => {
      setBook(response.data);
    });

    if (book?.data && Array.isArray(book.data)) {
      setValue("isbn", book.isbn || "");
      setValue("title", book.title || "");
      setValue("author", book.author || "");
      setValue("language", book.language || "");
      setValue("publishedDate", book.publishedDate || "");
      setValue("edition", book.edition || "");
      setValue("pageCount", book.pageCount || "");
      setValue("quantity", book.quantity || "");
      setValue("price", book.price || "");
      setValue("description", book.description || "");
      //   setValue("categoryId", selectedBook.categoryId || "");
    }
  }, [id, setValue]);

  const handleBookImage = (e) => {
    setBookImage(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    console.log("the id is", id);
    console.log("the data is", data);

    const formData = new FormData();
    formData.append(
      "bookRequestDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    formData.append("bookImage", bookImage);

    try {
      const response = await GlobalService.put(
        `/api/v1/la/books/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOpen(false);
      refetchBooks();
      refetchCategories();
    } catch (error) {
      console.log(error);
      if (error.status === 409) {
        toast.error(error?.response?.data?.message || "Error!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilLine size={20} />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="sm:max-w-[500px]">
          <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
            <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
              <BookOpenText size={27} />
            </div>
            <span className="text-lg">Update Book</span>
          </DialogTitle>
          <div className="my-0 h-px bg-gray-800 mx-5" />
        </DialogHeader>

        <ScrollArea className="h-[70vh] mb-3 ">
          <form onSubmit={handleSubmit(onSubmit)} className="mx-2 px-3">
            <div className="space-y-4 mb-5 pl-1">
              <div className="flex flex-col gap-1">
                <Label>ISBN</Label>
                <Input
                  id="isbn"
                  type="text"
                  defaultValue={book?.isbn || ""}
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
                <Label>Title</Label>
                <Input
                  id="title"
                  type="text"
                  defaultValue={book?.title || ""}
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
                <Label>Author</Label>
                <Input
                  id="author"
                  type="text"
                  defaultValue={book?.author || ""}
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
                <Label>Category</Label>
                <select
                  name="categoryId"
                  id="category"
                  className="w-[420px] border rounded-[8px] border-gray-300 mb-0 h-11"
                  required
                  onValueChange={(value) => setValue("categoryId", value)}
                  {...register("categoryId")}
                >
                  <option disabled>Select at category</option>
                  {categories?.data.map((element, index) => (
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
                <Label>Shelf</Label>
                <select
                  name="shelfId"
                  id="shelf"
                  className="w-[420px] border rounded-[8px] border-gray-300 mb-0 h-11"
                  required
                  onValueChange={(value) => setValue("shelfId", value)}
                  {...register("shelfId", { valueAsNumber: true })}
                >
                  <option disabled>Select at shelf</option>
                  {Array.isArray(availableShelfs?.data) &&
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
              <div className="flex flex-col gap-1">
                <Label>Language</Label>
                <Input
                  id="language"
                  type="text"
                  defaultValue={book?.language || ""}
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
              <div className="flex flex-col gap-1">
                <Label>Published Date</Label>
                <Input
                  id="published-date"
                  type="date"
                  defaultValue={book?.publishedDate || ""}
                  className="col-span-3 border-gray-300 mb-0 h-11"
                  placeholder="Choose published date"
                  {...register("publishedDate", {
                    required: "Please select a date.",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const tomorrow = new Date();
                      tomorrow.setHours(0, 0, 0, 0);
                      tomorrow.setDate(tomorrow.getDate() + 1);

                      selectedDate.setHours(0, 0, 0, 0);
                      return (
                        selectedDate < tomorrow ||
                        "Date must be today or earlier."
                      );
                    },
                  })}
                />
                {errors?.publishedDate?.message && (
                  <p className="text-sm text-red-500 mt-0.5">
                    {errors?.publishedDate?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label>Edition</Label>
                <Input
                  id="edition"
                  type="text"
                  defaultValue={book?.edition || ""}
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

              <div className="flex flex-col gap-1">
                <Label>Page count</Label>
                <Input
                  id="page-count"
                  type="text"
                  defaultValue={book?.pageCount || ""}
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

              <div className="flex flex-col gap-1">
                <Label>Quantity</Label>
                <Input
                  id="quantity"
                  type="text"
                  defaultValue={book?.quantity || ""}
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

              <div className="flex flex-col gap-1">
                <Label>Price</Label>
                <Input
                  id="per-book-cost"
                  type="text"
                  defaultValue={book?.price || ""}
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

              <div className="flex flex-col gap-1">
                <Label>Image</Label>
                <Input
                  type="file"
                  className="col-span-3 h-11 border border-gray-300"
                  onChange={handleBookImage}
                  accept="image/jpeg, image/png"
                  required
                ></Input>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Descriptoin</Label>
                <Input
                  id="description"
                  type="text"
                  defaultValue={book?.description || ""}
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
            <DialogFooter className="grid grid-cols-4 mb-3 ml-1">
              <Button
                className="grid col-span-2 w-full"
                onClick={() => {
                  reset();
                  setBookImage(null);
                }}
              >
                Clear
              </Button>
              <Button type="submit" className="grid col-span-2 w-full">
                Update
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBook;
