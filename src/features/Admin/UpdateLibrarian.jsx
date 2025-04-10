import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import GlobalService from "@/services/GlobalServices";
import useFetchLibrarian from "@/hooks/useFetchLibrarian";
import { PencilLine } from "lucide-react";

const UpdateLibrarian = ({ id }) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [evidenceImages, setEvidenceImages] = useState([]);

  const { data: librarians, refetch: refetchLibrarians } = useFetchLibrarian();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const selectedLibrarian = librarians?.data?.find(
      (librarian) => librarian.userId === id
    );
    if (selectedLibrarian) {
      setValue("name", selectedLibrarian.name || "")
    }
  }, [id]);

  const handleUserImage = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleEvidenceImage = (e) => {
    const newImage = e.target.files[0];
    setEvidenceImages((prevImages) => {
      return [...prevImages, newImage];
    });
    console.log([...evidenceImages, newImage]);
  };

  const onSubmit = (data) => {};

  return (
    <Dialog open={open} setOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PencilLine />
      </DialogTrigger>
      <DialogContent className="w-390" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Librarian</DialogTitle>
        </DialogHeader>
        <hr />
        <ScrollArea className="h-[70vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  defaultValue=""
                  {...register("name", {
                    required: "Please enter name!",
                    minLength: {
                      value: 5,
                      message: "Min lenght should be 5",
                    },
                    maxLength: {
                      value: 20,
                      message: "Max lenght should be 20",
                    },
                  })}
                />
                <p>{errors?.name?.message}</p>
              </div>

              <div>
                <Label htmlFor="title">Contact</Label>
                <Input
                  id="contact"
                  type="text"
                  defaultValue=""
                  {...register("contactNumber", {
                    required: "Please enter contact!",
                    minLength: {
                      value: 10,
                      message: "Please enter atleast 10 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max length should be 50",
                    },
                  })}
                />
                <p>{errors?.contactNumber?.message}</p>
              </div>

              <div>
                <Label htmlFor="title">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue=""
                  {...register("email", {
                    required: "Please enter email!",
                    minLength: {
                      value: 10,
                      message: "Please enter atleast 5 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max length should be 50",
                    },
                  })}
                />
                <p>{errors?.email?.message}</p>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  defaultValue=""
                  {...register("address", {
                    required: "Please enter is address!",
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
                <p>{errors?.address?.message}</p>
              </div>

              <div>
                <Label htmlFor="address">Password</Label>
                <Input
                  id="password"
                  type="text"
                  defaultValue=""
                  {...register("password", {
                    required: "Please enter password!",
                    minLength: {
                      value: 5,
                      message: "Minimum length is required",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max length should be 50",
                    },
                  })}
                />
                <p>{errors?.password?.message}</p>
              </div>

              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  defaultValue=""
                  onChange={handleUserImage}
                  accept="image/jpeg, image/png"
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Evidence One</Label>
                <Input
                  id="e1-image"
                  type="file"
                  defaultValue=""
                  onChange={handleEvidenceImage}
                  accept="image/jpeg, image/png"
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Evidence Two</Label>
                <Input
                  id="e2-image"
                  type="file"
                  defaultValue=""
                  onChange={handleEvidenceImage}
                  accept="image/jpeg, image/png"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  defaultValue=""
                  {...register("description", {
                    required: "Please enter description",
                    minLength: {
                      value: 1,
                      message: "Min length is required",
                    },
                  })}
                />
                <p>{errors?.description?.message}</p>
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
  );
};

export default UpdateLibrarian;
