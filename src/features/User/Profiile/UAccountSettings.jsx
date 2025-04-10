import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { useEffect } from "react";
import KYC from "../Register/KYC";

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
    <section>
      <div>
        <div>
          <h1>Account Settings</h1>
          <p>Here, you can see and manage your info and activities.</p>
        </div>
        <div>
          <div className="flex flex-row justify-between items-center">
            <p>Personal Information</p>
            <div className="relative group inline-block">
              <button
                disabled={userProfile?.data?.verified}
                className={`px-4 py-2 rounded transition-colors duration-200
                ${
                  userProfile?.data?.verified
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed w-full"
                    : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer w-full"
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
          <div>
            <div>
              <h1>Full Name</h1>
              <p>{userProfile?.data?.name || "NOT PROVIDED"}</p>
            </div>
            <div>
              <h1>Email</h1>
              <p>{userProfile?.data?.email || "NOT PROVIDED"}</p>
            </div>
            <div>
              <h1>Phone Number</h1>
              <p>{userProfile?.data?.contactNumber || "NOT PROVIDED"}</p>
            </div>
            <div>
              <h1>Address</h1>
              <p>{userProfile?.data?.address || "NOT PROVIDED"}</p>
            </div>
            <div>
              <h1>Applied Date</h1>
              <p>{userProfile?.data?.appliedDate || "YET TO DO"}</p>
            </div>
            <div>
              <h1>Verified Date</h1>
              {userProfile?.data?.verified === true ? (
                <p>{userProfile?.data?.verifiedDate || "YET TO BE"}</p>
              ) : (
                <p>YET TO BE</p>
              )}
            </div>
            <div>
              <h1>Verification Status</h1>
              <p>
                {userProfile?.data?.verified === true
                  ? "VERIFIED"
                  : "NOT VERIFIED"}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              {Array.isArray(userProfile?.data?.evidences) &&
              userProfile.data.evidences.length > 0 &&
              userProfile.data.evidences[0].evidenceOne ? (
                <img
                  src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceOne}`}
                  alt="Evidence One"
                />
              ) : (
                <p>No evidence image available</p>
              )}

              {Array.isArray(userProfile?.data?.evidences) &&
              userProfile.data.evidences.length > 0 &&
              userProfile.data.evidences[0].evidenceTwo ? (
                <img
                  src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceTwo}`}
                  alt="Evidence Two"
                />
              ) : (
                <p>No evidence image available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UAccountSettings;
