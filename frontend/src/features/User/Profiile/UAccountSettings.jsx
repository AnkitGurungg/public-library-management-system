import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import { useEffect, useState } from "react";
import KYC from "../Register/KYC";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase text-gray-500 mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

const UAccountSettings = () => {
  const {
    data: userProfile,
    refetch: refetchUserProfile,
    isLoading,
  } = useFetchUserProfile();

  useEffect(() => {
    refetchUserProfile();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      const response = await GLOBAL_SERVICE.put(
        "/api/v1/mla/password/change",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        reset();
        toast.success(response?.data || "Password changed.");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error?.response?.data?.message || "Provide valid details.");
      }
      if (error.response.status === 409) {
        toast.error(error?.response?.data?.message || "Please try again.");
      }
      if (error.response.status === 500) {
        toast.error(error?.response?.data?.message || "Server error!");
      }
    }
  };

  return (
    <div className="flex-1 ml-64 p-3">
      <main className="p-6 pt-3">
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Account Settings
          </h2>
          <p className="text-gray-600">
            Here, you can see and manage your information.
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">
              Personal Information
            </h3>
            <div className="relative group inline-block">
              <button
                disabled={userProfile?.data?.verified}
                className={`px-6 py-2 rounded-md transition-colors duration-200 font-medium
                ${
                  userProfile?.data?.verified
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-gray-800 hover:text-[#206ea6] cursor-pointer border-none"
                }
              `}
              >
                <KYC />
              </button>

              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform text-sm bg-[#f1f1f1] text-[#65768f] px-2 py-1 rounded whitespace-nowrap z-10">
                {userProfile?.data?.verified
                  ? "Already verified"
                  : "Please fill up KYC"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <InfoField
              label="FULL NAME"
              value={userProfile?.data?.name || "N/A"}
            />
            <InfoField
              label="EMAIL"
              value={userProfile?.data?.email || "N/A"}
            />
            <InfoField
              label="PHONE NUMBER"
              value={userProfile?.data?.contactNumber || "N/A"}
            />
            <InfoField
              label="ADDRESS"
              value={userProfile?.data?.address || "N/A"}
            />
            <InfoField
              label="APPLIED DATE"
              value={userProfile?.data?.appliedDate || "N/A"}
            />
            <InfoField
              label="VERIFIED DATE"
              value={userProfile?.data?.verifiedDate || "N/A"}
            />
            <InfoField
              label="VERIFICATION STATUS"
              value={
                userProfile?.data?.verified === true
                  ? "VERIFIED"
                  : "NOT VERIFIED"
              }
            />
            <InfoField
              label="KYC STATUS"
              value={
                userProfile?.data?.profileUpdated === true
                  ? "FILLED UP"
                  : "NOT FILLED UP"
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-100 p-6 rounded-md flex items-center justify-center text-gray-500">
              {userProfile?.data?.evidence &&
              userProfile?.data?.evidence?.evidenceOne ? (
                <img
                  src={`${BACKEND_SERVER_BASE_URL}/${userProfile?.data?.evidence?.evidenceOne}`}
                  alt="Evidence One"
                  className="w-full h-auto rounded-md border border-gray-200"
                />
              ) : (
                <p className="p-4 bg-gray-100 rounded-md text-gray-500 text-center">
                  No evidence image available
                </p>
              )}
            </div>

            <div className="bg-gray-100 p-6 rounded-md flex items-center justify-center text-gray-500">
              {userProfile?.data?.evidence &&
              userProfile?.data?.evidence?.evidenceTwo ? (
                <img
                  src={`${BACKEND_SERVER_BASE_URL}/${userProfile?.data?.evidence?.evidenceTwo}`}
                  alt="Evidence Two"
                  className="w-full h-auto rounded-md border border-gray-200 object-cover"
                />
              ) : (
                <p className="p-4 bg-gray-100 rounded-md text-gray-500 text-center">
                  No evidence image available
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex-col items-center justify-between mb-0">
            <h3 className="text-2xl font-bold text-gray-800">
              Security Settings
            </h3>
            <p className="text-sm text-gray-500 items-start">
              Update your password regularly for better security.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="password"
                id="oldPassword"
                placeholder="Enter Old Password"
                {...register("oldPassword", {
                  required: "Please enter old password.",
                  minLength: {
                    value: 3,
                    message: "Please enter at least 3 characters.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please enter no more than 30 characters.",
                  },
                })}
                className="w-full h-[55px] rounded-md border border-gray-200 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5] placeholder:font-medium placeholder:opacity-50 placeholder:text-sm placeholder:text-gray-950"
              />
              <p className="text-red-500 text-[15px] ml-0.5">
                {errors?.oldPassword?.message}
              </p>
            </div>

            <div>
              <Input
                type="password"
                id="newPassword"
                placeholder="Enter New Password"
                {...register("newPassword", {
                  required: "Please enter new password.",
                  minLength: {
                    value: 8,
                    message: "Please use at least 8 characters.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please enter no more than 30 characters.",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character!",
                  },
                })}
                className="w-full h-[55px] rounded-md border  border-gray-200 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5] placeholder:font-medium placeholder:opacity-50 placeholder:text-sm placeholder:text-gray-950"
              />
              <p className="text-red-500 text-[15px] ml-0.5">
                {errors?.newPassword?.message}
              </p>
            </div>

            <div>
              <Input
                type="password"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                {...register("confirmNewPassword", {
                  required: "Please enter confirm password.",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match.",
                  minLength: {
                    value: 8,
                    message: "Please use at least 8 characters.",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please enter no more than 30 characters.",
                  },
                })}
                className="w-full h-[55px] rounded-md border  border-gray-200 bg-white px-4 focus:outline-none focus:ring-1 focus:ring-[#81c7b5] placeholder:font-medium placeholder:opacity-50 placeholder:text-sm placeholder:text-gray-950"
              />
              <p className="text-red-500 text-[15px] ml-0.5">
                {errors?.confirmNewPassword?.message}
              </p>
            </div>

            <div className="flex items-center justify-center border rounded-md bg-[#c7312b] text-white uppercase w-1/4 h-[55px]">
              <Button
                type="submit"
                className="flex items-center justify-center w-full h-full bg-[#c7312b] text-white uppercase font-semibold transition-colors hover:bg-[#c7312b]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <CgSpinner className="animate-spin text-[40px]" />
                  </span>
                ) : (
                  <p className="flex items-center justify-center cursor-pointer w-full h-full">
                    Update Password
                  </p>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default UAccountSettings;
