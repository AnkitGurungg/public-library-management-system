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
import VerifyOTP from "./VerifyOTP";
import Login from "../Login/Login";
import LoadingComponent from "@/components/Loading/LoadingComponent";

const Register = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [showRegister, setShowRegister] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();

  const afterRegister = () => {
    reset();
    setShowOTP(true);
    setShowRegister(false);
    alert("Registration successful! Please check your email for verification.");
  };

  const onSubmit = async (data) => {
    setLoading(true);
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
        afterRegister();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showRegister && (
        <Dialog>
          <div className="flex items-center">
            <span>Don't have an account?</span>
            <DialogTrigger asChild>
              <span className="text-[#206ea6] hover:cursor-pointer ml-2">
                Register
              </span>
            </DialogTrigger>
          </div>

          <DialogContent className="w-390" aria-describedby={undefined}>
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle className="text-2xl opacity-75">
                Register An Account
              </DialogTitle>
            </DialogHeader>
            <hr />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 mb-3">
                <div>
                  <Input
                    id="email"
                    type="email"
                    defaultValue=""
                    placeholder="Enter Email"
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
                    className="h-13 placeholder-black placeholder-opacity-200 placeholder:text-[16px]"
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
                    // style={{ WebkitTextSecurity: "disc" }}
                    defaultValue=""
                    {...register("password", {
                      required: "Please enter password!",
                      minLength: {
                        value: 1,
                        message: "Min length is required",
                      },
                    })}
                    className="h-13 placeholder-black placeholder-opacity-200 placeholder:text-[16px]"
                  />
                  <p className="text-red-500 text-[15px] ml-0.5">
                    {errors?.password?.message}
                  </p>
                </div>
              </div>
              <DialogFooter className="grid grid-cols-4 w-full gap-0 mt-4">
                <Button
                  type="submit"
                  className={`grid col-span-4 h-12 text-[20px] bg-[#206ea6] hover:bg-[#206ea6]`}
                >
                  Register
                </Button>

                <div className="col-span-4 flex items-center">
                  <div>Already Have an Account?</div>
                  <div className="text-[#206ea6] ml-2">{<Login />}</div>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
      {showOTP && <VerifyOTP />}
      {loading && <LoadingComponent />}
    </div>
  );
};

export default Register;
