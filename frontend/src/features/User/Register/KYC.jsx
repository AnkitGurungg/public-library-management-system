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
import { useRef, useState } from "react";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { IdCard } from "lucide-react";

const KYC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [error, setError] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [evidenceImages, setEvidenceImages] = useState([]);

  const e1Ref = useRef(null);
  const e2Ref = useRef(null);

  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();
  const { data: userProfile, refetch: refetchUserProfile } =
    useFetchUserProfile();

  const handleUserImage = (e) => {
    setUserImage(e.target.files[0]);
  };

  const handleEvidenceImage = (e, index) => {
    const newImage = e.target.files[0];

    const updatedImages = [...evidenceImages];
    updatedImages[index] = newImage;
    setEvidenceImages(updatedImages);
    console.log(`Selected image for evidence ${index + 1}:`, newImage?.name);
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
      const response = await GLOBAL_SERVICE.post("/auth/v1/kyc", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Submitted");
      reset();
      setUserImage(null);
      setEvidenceImages([]);
      setError(null);

      if (e1Ref.current) e1Ref.current.value = "";
      if (e2Ref.current) e2Ref.current.value = "";

      refetchNonVerifiedMembers();
      refetchUserProfile();
    } catch (error) {
      toast.error("Please try again!");
      if (error.status === 400) {
        toast.error("Invalid values!");
      }
      if (error.status === 500) {
        toast.error("Internal Server Error!");
      }
    }

    const resetForm = () => {
      reset();
      setUserImage(null);
      setEvidenceImages([null, null]);
      setError(null);

      if (e1Ref.current) e1Ref.current.value = "";
      if (e2Ref.current) e2Ref.current.value = "";
    };
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-lg font-medium">
            KYC
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold  flex items-center mb-0 mx-5">
              <div className="h-12 bg-[#d7d7d7] w-12 flex justify-center items-center rounded-md mr-3">
                <IdCard size={35} />
              </div>
              KYC Verification
            </DialogTitle>
          </DialogHeader>
          <div className="my-0 h-px w-full bg-gray-800" />
          <ScrollArea className="max-h-[70vh] px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1 px-1">
                  <Label
                    htmlFor="name"
                    className="text-base font-medium pl-0.5"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    className="h-12 border border-gray-300 mb-0"
                    {...register("name", {
                      required: "Please enter name!",
                      minLength: {
                        value: 5,
                        message: "Min length should be 5",
                      },
                      maxLength: {
                        value: 20,
                        message: "Max length should be 20",
                      },
                    })}
                  />
                  {errors?.name?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1 px-1">
                  <Label
                    htmlFor="contact"
                    className="text-base font-medium pl-0.5"
                  >
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    type="text"
                    placeholder="Enter contact number"
                    className="h-12 border border-gray-300 mb-0"
                    {...register("contactNumber", {
                      required: "Please enter contact!",
                      minLength: {
                        value: 10,
                        message: "Please enter at least 10 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max length should be 50",
                      },
                    })}
                  />
                  {errors?.contactNumber?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1 px-1">
                  <Label
                    htmlFor="address"
                    className="text-base font-medium pl-0.5"
                  >
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter address"
                    className="h-12 border border-gray-300 mb-0"
                    {...register("address", {
                      required: "Please enter address!",
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
                  {errors?.address?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1 px-1">
                  <Label
                    htmlFor="image"
                    className="text-base font-medium pl-0.5"
                  >
                    Your Picture
                  </Label>
                  <div className="rounded-md">
                    <Input
                      id="image"
                      type="file"
                      className="h-12 border-gray-300 file:mr-4 file:mt-1 file:border-0 file:bg-gray-200 file:px-4 file:text-sm file:font-medium hover:file:bg-gray-200"
                      onChange={handleUserImage}
                      accept="image/jpeg, image/png"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <Label
                    htmlFor="e1-image"
                    className="text-base font-medium pl-0.5"
                  >
                    Evidence One
                  </Label>
                  <div className="rounded-md">
                    <Input
                      id="e1-image"
                      type="file"
                      className="h-12 border-gray-300 file:mr-4 file:mt-1 file:border-0 file:bg-gray-200 file:px-4 file:text-sm file:font-medium hover:file:bg-gray-200"
                      onChange={(e) => handleEvidenceImage(e, 0)}
                      ref={e1Ref}
                      accept="image/jpeg, image/png"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <Label
                    htmlFor="e2-image"
                    className="text-base font-medium pl-0.5"
                  >
                    Evidence Two
                  </Label>
                  <div className="rounded-md">
                    <Input
                      id="e2-image"
                      type="file"
                      className="h-12 border-gray-300 file:mr-4 file:mt-1 file:border-0 file:bg-gray-200 file:px-4 file:text-sm file:font-medium hover:file:bg-gray-200"
                      onChange={(e) => handleEvidenceImage(e, 1)}
                      ref={e2Ref}
                      accept="image/jpeg, image/png"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <Label
                    htmlFor="description"
                    className="text-base font-medium pl-0.5"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter message"
                    className="min-h-[80px] resize-none mb-0 border-gray-300"
                    {...register("description", {
                      required: "Please enter message!",
                      minLength: {
                        value: 1,
                        message: "Min length is required",
                      },
                    })}
                  />
                  {errors?.description?.message && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="rounded-md bg-red-50 p-3">
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}
              </div>

              <DialogFooter className="mt-6 flex gap-4 sm:justify-between px-1">
                {/* <Button
                type="button"
                variant="outline"
                className="flex-1"
                  onClick={() => {
                    reset();
                    setUserImage(null);
                    setEvidenceImages([]);
                    setError(null);

                    if (e1Ref.current) e1Ref.current.value = "";
                    if (e2Ref.current) e2Ref.current.value = "";
                  }}
                >
                  reset
                </Button> */}
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-black text-white uppercase font-semibold h-10 hover:bg-black hover:text-white cursor-pointer"
                    onClick={() => {
                      reset();
                      setUserImage(null);
                      setEvidenceImages([]);
                      setError(null);

                      if (e1Ref.current) e1Ref.current.value = "";
                      if (e2Ref.current) e2Ref.current.value = "";
                    }}
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="flex-1 font-semibold uppercase h-10 cursor-pointer"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYC;
