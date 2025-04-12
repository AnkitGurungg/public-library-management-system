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
import VerifyOTP from "./VerifyEmail";
import Login from "../Login/Login";
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
    reset,
  } = useForm();
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();

  const onSubmit = async (data) => {
    try {
      const response = await GlobalService.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

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
          alert("400");
        }
        if (error.response.status === 409) {
          alert(error.response.data.message);
        }
        if (error.response.status === 500) {
          alert("500");
        }
      }
    }
  };

  return (
    <div>
      <VerifyEmail
        isVerifyEmailOpen={isVerifyEmailOpen}
        setIsVerifyEmailOpen={setIsVerifyEmailOpen}
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
                    placeholder="Email Address"
                    {...register("email", {
                      required: "Please enter email!",
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
                      required: "Please enter password!",
                      minLength: {
                        value: 1,
                        message: "Min length is required",
                      },
                    })}
                    className="w-full h-[65px] rounded-xl border  border-gray-300 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5]"
                  />
                  <p className="text-red-500 text-[15px] ml-0.5">
                    {errors?.password?.message}
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
                    "Register"
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
