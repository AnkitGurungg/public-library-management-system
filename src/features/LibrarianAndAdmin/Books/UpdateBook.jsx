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
import { PencilLine } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlobalService from "@/services/GlobalServices";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import { useFetchCategory } from "@/hooks/useFetchCategory";

const UpdateBook = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [bookImage, setBookImage] = useState(null);

  const { data: books, refetch: refetchBooks } = useFetchBooks();
  const { data: categories, refetch: refetchCategories } = useFetchCategory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const selectedBook = books?.data?.find((book) => book.bookId === id);
    if (selectedBook) {
      setValue("isbn", selectedBook.isbn || "");
      setValue("title", selectedBook.title || "");
      setValue("author", selectedBook.author || "");
      setValue("language", selectedBook.language || "");
      setValue("publishedDate", selectedBook.publishedDate || "");
      setValue("edition", selectedBook.edition || "");
      setValue("pageCount", selectedBook.pageCount || "");
      setValue("quantity", selectedBook.quantity || "");
      setValue("price", selectedBook.price || "");
      setValue("description", selectedBook.description || "");
      //   setValue("categoryId", selectedBook.categoryId || "");
    }
  }, [books, id, setValue]);

  const handleBookImage = (e) => {
    setBookImage(e.target.files[0]);
    console.log(e.target.files[0]);
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
        `/api/book/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("the response is", response);
      setOpen(false);
      refetchBooks()
      refetchCategories()
    } catch (error) {
      console.log("the error is ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilLine />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {books?.data
            ?.filter((book) => book.bookId == id)
            .map((element, index) => (
              <div key={element.bookId || index}>
                <div>
                  <Label>ISBN</Label>
                  <Input
                    type="text"
                    {...register("isbn", {
                      required: "Please enter ISBN!",
                      minLength: {
                        value: 5,
                        message: "Please enter atleast 5 character!",
                      },
                    })}
                  />
                  <p>{errors?.isbn?.message}</p>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    {...register("title", {
                      required: "Please enter title!",
                      minLength: {
                        value: 5,
                        message: "Please enter atleast 5 characters!",
                      },
                    })}
                  />
                  <p>{errors?.title?.message}</p>
                </div>
                <div>
                  <Label>Author</Label>
                  <Input
                    type="text"
                    {...register("author", {
                      required: "Please enter author!",
                      minLength: {
                        value: 5,
                        message: "Please enter atleast 5 characters!",
                      },
                    })}
                  />
                  <p>{errors?.author?.message}</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <select
                    name="categoryId"
                    id="category"
                    className="border-2 w-115 h-9 rounded-[8px]"
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
                </div>
                <div>
                  <Label>Language</Label>
                  <Input
                    type="text"
                    {...register("language", {
                      required: "Please enter language!",
                      minLength: {
                        value: 5,
                        message: "Please enter atleast 5 characters!",
                      },
                    })}
                  />
                  <p>{errors?.language?.message}</p>
                </div>
                <div>
                  <Label>Published Date</Label>
                  <Input type="date" {...register("publishedDate", {
                    required: "Please enter published date!"
                  })}></Input>
                </div>
                <div>
                  <Label>Edition</Label>
                  <Input
                    type="text"
                    {...register("edition", {
                      required: "Please enter edition!",
                      minLength: {
                        value: 1,
                        message: "Please enter atleast 1 character!",
                      },
                    })}
                  />
                  <p>{errors?.edition?.message}</p>
                </div>
                <div>
                  <Label>Page count</Label>
                  <Input
                    type="text"
                    {...register("pageCount", {
                      required: "Please enter page count!",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number!",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid page count!",
                      },
                      minLength: {
                        value: 1,
                        message: "Please enter atleast 1 character!",
                      },
                    })}
                  />
                  <p>{errors?.pageCount?.message}</p>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <Input
                    type="text"
                    {...register("quantity", {
                      required: "Please enter quantity!",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number!",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid quantity!",
                      },
                      minLength: {
                        value: 1,
                        message: "Please enter atleast 1 character!",
                      },
                    })}
                  />
                  <p>{errors?.quantity?.message}</p>
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="text"
                    {...register("price", {
                      required: "Please enter price!",
                      pattern: {
                        value: /^\d+$/,
                        message: "Please enter a number!",
                      },
                      min: {
                        value: 0,
                        message: "Please enter valid price!",
                      },
                      minLength: {
                        value: 1,
                        message: "Please enter atleast 1 character!",
                      },
                    })}
                  />
                  <p>{errors?.price?.message}</p>
                </div>
                <div>
                  <Label>Image</Label>
                  <Input
                    type="file"
                    onChange={handleBookImage}
                    accept="image/jpeg, image/png"
                    required
                  ></Input>
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
                  ></Input>
                </div>
              </div>
            ))}
          <DialogFooter>
            <DialogClose>
              <Button>Close</Button>
            </DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBook;
