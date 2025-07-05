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
import { PlusCircle, ShieldUserIcon } from "lucide-react";
import toast from "react-hot-toast";

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
      "kycFillUpDto",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    formData.append("userImage", userImage);
    evidenceImages.forEach((image) => {
      formData.append("evidenceImages", image);
    });

    try {
      const response = await GLOBAL_SERVICE.post(
        "/api/v1/a/librarians",
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
        toast.success("Librarian added!");
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
          <Button className="opacity-90">
            <PlusCircle></PlusCircle>
            Add Librarian
          </Button>
        </DialogTrigger>

        <DialogContent className="w-390" aria-describedby={undefined}>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <ShieldUserIcon size={27} />
              </div>
              <span className="text-lg">Add librarian</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-5" />
          </DialogHeader>
          <ScrollArea className="h-[70vh] mx-2 mb-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 px-3 mb-5">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter name"
                    {...register("name", {
                      required: "Please enter name.",
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
                  {errors?.name?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.name?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="title">Contact</Label>
                  <Input
                    id="contact"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter contact"
                    {...register("contactNumber", {
                      required: "Please enter contact.",
                      minLength: {
                        value: 10,
                        message: "Please enter atleast 10 characters.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Please enter no more than 20 characters.",
                      },
                    })}
                  />
                  {errors?.contactNumber?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.contactNumber?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="title">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter email"
                    {...register("email", {
                      required: "Please enter email!",
                      minLength: {
                        value: 5,
                        message: "Please enter atleast 5 characters",
                      },
                      maxLength: {
                        value: 40,
                        message: "Please enter no more than 20 characters.",
                      },
                    })}
                  />
                  {errors?.email?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.email?.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter address"
                    {...register("address", {
                      required: "Please enter address.",
                      minLength: {
                        value: 3,
                        message: "Please enter atleast 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Please enter no more than 20 characters.",
                      },
                    })}
                  />
                  {errors?.address?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors?.address?.message}
                    </p>
                  )}
                </div>

                {/* <div className="flex flex-col gap-1">
                  <Label htmlFor="address">Password</Label>
                  <Input
                    id="password"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter password"
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
                </div> */}

                <div className="flex flex-col gap-1">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    defaultValue=""
                    className="col-span-3 h-11 border border-gray-300"
                    onChange={handleUserImage}
                    accept="image/jpeg, image/png"
                    required
                  />
                  <p>{error}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="image">Evidence One</Label>
                  <Input
                    id="e1-image"
                    type="file"
                    defaultValue=""
                    className="col-span-3 h-11 border border-gray-300"
                    onChange={handleEvidenceImage}
                    accept="image/jpeg, image/png"
                    required
                  />
                  <p>{error}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="image">Evidence Two</Label>
                  <Input
                    id="e2-image"
                    type="file"
                    defaultValue=""
                    className="col-span-3 h-11 border border-gray-300"
                    onChange={handleEvidenceImage}
                    accept="image/jpeg, image/png"
                    required
                  />
                  <p>{error}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    type="text"
                    defaultValue=""
                    className="col-span-3 border-gray-300 mb-0 h-11"
                    placeholder="Enter description"
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
              {/* <DialogFooter className="grid grid-cols-4">
                <DialogClose asChild>
                  <Button className="grid col-span-2">Close</Button>
                </DialogClose>
                <Button type="submit" className="grid col-span-2">
                  Add
                </Button>
              </DialogFooter> */}
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

export default AddLibrarian;
