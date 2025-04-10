import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import GlobalService from "@/services/GlobalServices";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await GlobalService.post("/auth/v1/verify/otp", { otp });

      if (response.status === 200) {
        alert("OTP Verified Successfully!");
        // onVerify();
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </form>
  );
};

export default VerifyOTP;
