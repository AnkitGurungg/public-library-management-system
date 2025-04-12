import { useContext, useState } from "react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import toast from "react-hot-toast";
import { UserContext } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { CgSpinner } from "react-icons/cg";

const VerifyEmail = ({ isVerifyEmailOpen, setIsVerifyEmailOpen }) => {
  const {
    token,
    setToken,
    loading,
    userInfo = {},
    getUserInfo,
  } = useContext(UserContext);

  const [otp, setOtp] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await GLOBAL_SERVICE.post("/auth/v1/verify/otp", {
        otp,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.removeItem("Authorization");
        toast.success(response.data.message || "Email Verified!");
        setIsVerifyEmailOpen(false);
      }
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error(error?.response?.data?.message || "Regenerate new OTP");
      } else {
        console.log("njjjj")
        toast.error(error?.response?.data?.message || "Regenerate new OTP");
      }
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await GLOBAL_SERVICE.get("/auth/v1/regenerate-otp");
      console.log(response);
      toast.success("OTP send again");
    } catch (error) {
      console.log(error);
      if (error) {
        toast.success(error?.response?.data?.message);
      }
      console.error("OTP verification failed:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <Dialog
        open={isVerifyEmailOpen}
        onOpenChange={setIsVerifyEmailOpen}
        aria-describedby={undefined}
      >
        <DialogContent className="">
          <DialogHeader className="flex justify-center items-center">
            <DialogTitle className=" opacity-75 text-4xl font-bold text-[#2d3436]">
              Register An Account
            </DialogTitle>
          </DialogHeader>
          <hr />
          <div className="flex text-center justify-center">
            <p className=" text-[#636e72] px-4">
              We've sent a verification code to your email address. Please enter
              the 6-digit code below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="flex flex-col items-center space-y-4">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                className="mx-auto"
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className="w-14 h-16 text-xl border-2 border-gray-300 rounded-lg"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-14 h-16 text-xl border-2 border-gray-300 rounded-lg"
                  />
                </InputOTPGroup>

                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={2}
                    className="w-14 h-16 text-xl border-2 border-gray-300 rounded-lg"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-14 h-16 text-xl border-2 border-gray-300 rounded-lg"
                  />
                </InputOTPGroup>

                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={4}
                    className="w-14 h-16 text-xl border-2 border-gray-300 rounded-lg"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-14 h-16 text-xl border-2 border-gray-300 rounded-lg"
                  />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                className="bg-[#196489] w-full h-[65px] mx-auto mt-4 flex items-center justify-center rounded-xl text-white text-xl font-medium transition-colors hover:bg-[#196489]"
                disabled={otp.length !== 6 || isSending}
              >
                Verify Email
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground mr-2">
              Didn't receive the code?
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={resendOTP}
              disabled={isSending}
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <CgSpinner className="animate-spin text-[40px]" />
                </span>
              ) : (
                "Resend code"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifyEmail;
