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

const Login = () => {
  const { getUserInfo, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await GLOBAL_SERVICE.post("/auth/login", data);
      console.log(response);
      if (response.status === 200) {
        reset();
        setOpen(false);
        alert("Login success");
        const token = response.headers.get("Authorization");
        localStorage.setItem("Authorization", token);
        setToken(token);
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
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          navigate("/");
          alert("401");
        }
        if (error.response.status === 403) {
          navigate("/");
          alert("403");
        }
        if (error.response.status === 412) {
          alert("400");
        }
        if (error.response.status === 500) {
          navigate("/");
          alert("500");
        }
      }
      return error;
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="hover:text-[#206ea6] hover:cursor-pointer ">
            Login
          </button>
        </DialogTrigger>
        <DialogContent className="w-390" aria-describedby={undefined}>
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle className="text-2xl opacity-75">
              You must login
            </DialogTitle>
          </DialogHeader>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)} className="m-0">
            <div className="flex flex-col gap-4 mb-3">
              <div>
                <Input
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
            <DialogFooter className="grid grid-cols-4 items-center w-full gap-0 mt-4">
              <Button
                type="submit"
                className="col-span-4 h-12 text-[20px] bg-[#206ea6] hover:bg-[#206ea6] hover:cursor-pointer"
              >
                Login
              </Button>
              <span className="text-[#206ea6] col-span-4 text-center hover:cursor-pointer mt-0 justify-self-end">
                Forgot password?
              </span>
            </DialogFooter>
          </form>
          <div className="mt-0">
            <Register />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
