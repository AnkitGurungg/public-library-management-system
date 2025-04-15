import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { useEffect, useState } from "react";
import KYC from "../Register/KYC";
import { BookOpen, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

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

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

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
              value={
                userProfile?.data?.verified === true
                  ? userProfile?.data?.verifiedDate
                  : "N/A"
              }
            />
            <InfoField
              label="VERIFICATION STATUS"
              value={
                userProfile?.data?.verified === true
                  ? "VERIFIED"
                  : "NOT VERIFIED"
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-100 p-6 rounded-md flex items-center justify-center text-gray-500">
              {Array.isArray(userProfile?.data?.evidences) &&
              userProfile.data.evidences.length > 0 &&
              userProfile.data.evidences[0].evidenceOne ? (
                <img
                  src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceOne}`}
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
              {Array.isArray(userProfile?.data?.evidences) &&
              userProfile.data.evidences.length > 0 &&
              userProfile.data.evidences[0].evidenceTwo ? (
                <img
                  src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceTwo}`}
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
          <div className="flex items-center justify-between mb-0">
            <h3 className="text-2xl font-bold text-gray-800">
              Security Settings
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-500">
                  Update your password regularly for better security
                </p>
              </div>
              <button className="px-4 py-2 bg-[#206ea6] text-white rounded-md">
                Update
              </button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default UAccountSettings;
