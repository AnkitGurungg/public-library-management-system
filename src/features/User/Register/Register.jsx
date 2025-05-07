import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import GlobalService from "@/services/GlobalServices";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import LoadingComponent from "@/components/Loading/LoadingComponent";
import { CgSpinner } from "react-icons/cg";
import VerifyEmail from "./VerifyEmail";
import toast from "react-hot-toast";

const Register = ({ isOpenRegister, setIsOpenRegister, setIsOpenLogin }) => {
  const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();

  const onSubmit = async (data) => {
    try {
      console.log("Clicked");
      const { email, password } = data;
      console.log(data);
      console.log(email);
      console.log(password);
      const response = await GlobalService.post(
        "/auth/register",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        localStorage.setItem(
          "Authorization",
          response.headers.get("Authorization")
        );
        toast.success("Check your email for otp!");
        setIsOpenRegister(false);
        setIsVerifyEmailOpen(true);
      }
      refetchNonVerifiedMembers();
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Provide valid details!");
        }
        if (error.response.status === 409) {
          toast.error(error.response.data.message);
        }
        if (error.response.status === 500) {
          toast.error("Server error!");
        }
      }
    }
  };

  return (
    <div>
      <VerifyEmail
        isVerifyEmailOpen={isVerifyEmailOpen}
        setIsVerifyEmailOpen={setIsVerifyEmailOpen}
        setIsOpenLogin={setIsOpenLogin}
      />
      <Dialog open={isOpenRegister} onOpenChange={setIsOpenRegister}>
        <DialogContent className="w-390" aria-describedby={undefined}>
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle className=" opacity-75 text-4xl font-bold text-[#2d3436]">
              Register An Account
            </DialogTitle>
          </DialogHeader>
          <hr />
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md px-4">
              <div className="text-center mb-4">
                <p className=" text-[#636e72] px-4">
                  Create an account to enjoy all the services!
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                  <Input
                    className="w-full h-[65px] rounded-xl border border-gray-300 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5]"
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Please enter email!",
                      minLength: {
                        value: 1,
                        message: "Minimun 5 characters is required",
                      },
                      maxLength: {
                        value: 50,
                        message: "Max length should be 50",
                      },
                    })}
                  />
                  <p className="text-red-500 text-[15px] ml-0.5">
                    {errors?.email?.message}
                  </p>
                </div>
                <div>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Please enter password.",
                      minLength: {
                        value: 8,
                        message: "Please use at least 8 characters.",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                        message:
                          "Password must include uppercase, lowercase, number, and special character!",
                      },
                    })}
                    className="w-full h-[65px] rounded-xl border  border-gray-300 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5]"
                  />
                  <p className="text-red-500 text-[15px] ml-0.5">
                    {errors?.password?.message}
                  </p>
                </div>
                <div>
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password!",
                      validate: (value) =>
                        value === password || "Passwords do not match!",
                    })}
                    className="w-full h-[65px] rounded-xl border border-gray-300 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5]"
                  />
                  <p className="text-red-500 text-[15px] ml-0.5">
                    {errors?.confirmPassword?.message}
                  </p>
                </div>
                <Button
                  type="submit"
                  className="bg-[#196489] w-full h-[65px] mx-auto mt-4 flex items-center justify-center rounded-xl text-white text-xl font-medium transition-colors hover:bg-[#196489]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <CgSpinner className="animate-spin text-[40px]" />
                    </span>
                  ) : (
                    <span className="cursor-pointer w-full">Register</span>
                  )}
                </Button>
              </form>

              <div className="mt-5 text-center text-[#4d5156]">
                Already Have An Account?{" "}
                <a
                  className="font-medium text-[#196489] cursor-pointer"
                  onClick={() => {
                    setIsOpenLogin(true);
                    setIsOpenRegister(false);
                  }}
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
