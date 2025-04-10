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
import { useState } from "react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import useFetchLibrarian from "@/hooks/useFetchLibrarian";

const AddLibrarian = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [evidenceImages, setEvidenceImages] = useState([]);
  const {
    data: librarians,
    refetch: refetchLibrarian,
    isLoading,
  } = useFetchLibrarian();

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

  const onSubmit = async (data) => {
    console.log(data);

    if (!userImage || userImage === null) {
      setError("Select at least one");
      return;
    }

    const formData = new FormData();
    formData.append(
      "userRequestDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    formData.append("userImage", userImage);
    evidenceImages.forEach((image) => {
      formData.append("evidenceImages", image);
    });

    try {
      const response = await GLOBAL_SERVICE.post(
        "/api/v1/a/user/add/librarian",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.config.headers.getContentType());
      console.log(response.headers.getContentType());

      if (response.status === 201) {
        reset();
        setUserImage(null);
        setEvidenceImages([]);
        refetchLibrarian();
      }
    } catch (error) {
      console.log(error);
      if (error && error.status === 400) {
        alert("400");
      }
      if (error && error.status === 500) {
        alert("500");
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Librarian</Button>
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
                  <p>{error}</p>
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
                  <p>{error}</p>
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
                  <p>{error}</p>
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
    </div>
  );
};

export default AddLibrarian;
