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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import { UserContext } from "@/contexts/UserContext";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import toast from "react-hot-toast";
import VerifyEmail from "../Register/VerifyEmail";
import { CgSpinner } from "react-icons/cg";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const Login = ({ isOpenLogin, setIsOpenLogin }) => {
  const { getUserInfo, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  // const [open, setOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isVerifyEmailOpen, setIsVerifyEmailOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await GLOBAL_SERVICE.post("/auth/login", data, {
        skipAuthInterceptor: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        reset();
        setIsOpenLogin(false);
        toast.success("Login success");
        const token = response.headers.get("Authorization");
        localStorage.setItem("Authorization", token);
        setToken(token);
        const refreshToken = response.headers.get("refreshToken");
        localStorage.setItem("refreshToken", refreshToken);
        // getUserInfo();

        if (response?.data?.role === "ROLE_MEMBER") {
          navigate("/");
        }
        if (response?.data?.role === "ROLE_LIBRARIAN") {
          navigate("/librarian");
        }
        if (response?.data?.role === "ROLE_ADMIN") {
          navigate("/admin");
        }
        return response;
      }
      if (response.status === 203) {
        const token = response?.data?.accessToken;
        localStorage.setItem("Authorization", token);
        setToken(token);
        const refreshToken = response?.data?.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        
        navigate("/");
        setIsOpenLogin(false);
        toast.success("Verify your email first!");
        setIsVerifyEmailOpen(true);
        // getUserInfo();
        return response;
      }
    } catch (error) {
      console.log(error);
      if (error) {
        if (error?.response?.status === 401) {
          navigate("/");
          toast.error(
            error?.response?.data?.message || "Invalid username or password"
          );
        }
        if (error?.response?.status === 403) {
          toast.error(
            error?.response?.data?.message || "Permission not given!"
          );
          navigate("/");
        }
        if (error?.response?.status === 412) {
          toast.error(
            error?.response?.data?.message || "Pre login conditin failed!"
          );
        }

        // if (error.response.status === 428) {
        //   navigate("/");
        //   toast.success("Verify Email");
        //   localStorage.setItem(
        //     "Authorization",
        //     error?.response?.data?.accessToken
        //   );
        // }

        if (error.response.status === 500) {
          navigate("/");
          toast.error(error?.response?.data?.message || "Server error!");
        }
      }
      return error;
    }
  };

  return (
    <div>
      <ForgotPassword
        setIsForgotPasswordOpen={setIsForgotPasswordOpen}
        isForgotPasswordOpen={isForgotPasswordOpen}
        setIsOpenLogin={setIsOpenLogin}
      />

      <Register
        isOpenRegister={isOpenRegister}
        setIsOpenRegister={setIsOpenRegister}
        setIsOpenLogin={setIsOpenLogin}
      />
      <VerifyEmail
        isVerifyEmailOpen={isVerifyEmailOpen}
        setIsVerifyEmailOpen={setIsVerifyEmailOpen}
      />
      <Dialog open={isOpenLogin} onOpenChange={setIsOpenLogin}>
        <DialogContent className="w-390" aria-describedby={undefined}>
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle className=" opacity-75 text-4xl font-bold text-[#2d3436]">
              Login
            </DialogTitle>
          </DialogHeader>
          <hr />
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md px-4">
              <div className="text-center mb-4">
                <p className=" text-[#636e72] px-4">
                  Log in to access all features!
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
                  className="bg-[#196489] w-full h-[65px] mx-auto mt-4 flex items-center justify-center rounded-xl text-white text-xl font-medium transition-colors hover:bg-[#196489]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <CgSpinner className="animate-spin text-[40px]" />
                    </span>
                  ) : (
                    <span className="cursor-pointer w-full">Login</span>
                  )}
                </Button>
              </form>
              <div className="mt-5 text-center text-[#4d5156]">
                Don't Have An Account?{" "}
                <a
                  className="font-medium text-[#196489] cursor-pointer"
                  onClick={() => {
                    setIsOpenLogin(false);
                    setIsOpenRegister(true);
                  }}
                >
                  Sign Up
                </a>
              </div>
              <div className="flex justify-center">
                <span
                  className="text-[#196489] cursor-pointer mt-1"
                  onClick={() => {
                    setIsForgotPasswordOpen(true);
                    setIsOpenLogin(false);
                  }}
                >
                  Forgot Password ?
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
