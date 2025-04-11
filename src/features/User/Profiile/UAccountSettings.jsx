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
    // <section className="ml-64 p-3">
    //   <div>
    //     <div>
    //       <h1 className="text-2xl font-bold">Account Settings</h1>
    //       <p>Here, you can see and manage your Information.</p>
    //     </div>
    //     <div>
    //       <div className="flex flex-row justify-between items-center">
    //         <h1 className="text-xl font-bold">Personal Information</h1>
    //         <div className="relative group inline-block">
    //           <button
    //             disabled={userProfile?.data?.verified}
    //             className={`px-4 py-2 rounded transition-colors duration-200
    //             ${
    //               userProfile?.data?.verified
    //                 ? "bg-gray-300 text-gray-500 cursor-not-allowed w-full"
    //                 : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer w-full"
    //             }
    //           `}
    //           >
    //             <KYC />
    //           </button>

    //           <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform text-sm bg-[#f1f1f1] text-[#65768f] px-2 py-1 rounded whitespace-nowrap z-10">
    //             {userProfile?.data?.verified
    //               ? "Already verified"
    //               : "Please fill up KYC"}
    //           </span>
    //         </div>
    //       </div>
    //       <div className="flex flex-col gap-7">
    //         <div className="flex justify-around">
    //           <div>
    //             <h1 className="uppercase font-bold">Full Name</h1>
    //             <p>{userProfile?.data?.name || "NOT PROVIDED"}</p>
    //           </div>
    //           <div>
    //             <h1 className="uppercase font-bold">Email</h1>
    //             <p>{userProfile?.data?.email || "NOT PROVIDED"}</p>
    //           </div>
    //           <div>
    //             <h1 className="uppercase font-bold">Phone Number</h1>
    //             <p>{userProfile?.data?.contactNumber || "NOT PROVIDED"}</p>
    //           </div>
    //         </div>
    //         <div className="flex justify-around">
    //           <div>
    //             <h1 className="uppercase font-bold">Address</h1>
    //             <p>{userProfile?.data?.address || "NOT PROVIDED"}</p>
    //           </div>
    //           <div>
    //             <h1 className="uppercase font-bold">Applied Date</h1>
    //             <p>{userProfile?.data?.appliedDate || "YET TO DO"}</p>
    //           </div>
    //           <div>
    //             <h1 className="uppercase font-bold">Verified Date</h1>
    //             {userProfile?.data?.verified === true ? (
    //               <p>{userProfile?.data?.verifiedDate || "YET TO BE"}</p>
    //             ) : (
    //               <p>YET TO BE</p>
    //             )}
    //           </div>
    //         </div>
    //         <div>
    //           <h1>Verification Status</h1>
    //           <p>
    //             {userProfile?.data?.verified === true
    //               ? "VERIFIED"
    //               : "NOT VERIFIED"}
    //           </p>
    //         </div>
    //         <div className="flex flex-row gap-2">
    //           {Array.isArray(userProfile?.data?.evidences) &&
    //           userProfile.data.evidences.length > 0 &&
    //           userProfile.data.evidences[0].evidenceOne ? (
    //             <img
    //               src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceOne}`}
    //               alt="Evidence One"
    //             />
    //           ) : (
    //             <p>No evidence image available</p>
    //           )}

    //           {Array.isArray(userProfile?.data?.evidences) &&
    //           userProfile.data.evidences.length > 0 &&
    //           userProfile.data.evidences[0].evidenceTwo ? (
    //             <img
    //               src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceTwo}`}
    //               alt="Evidence Two"
    //             />
    //           ) : (
    //             <p>No evidence image available</p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="ml-64 p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-600">
          Here, you can see and manage your Information.
        </p>
      </div>

      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Personal Information</h1>
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

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
              FULL NAME
            </h1>
            <p className="text-gray-800">
              {userProfile?.data?.name || "NOT PROVIDED"}
            </p>
          </div>
          <div>
            <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
              EMAIL
            </h1>
            <p className="text-gray-800">
              {userProfile?.data?.email || "NOT PROVIDED"}
            </p>
          </div>
          <div>
            <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
              PHONE NUMBER
            </h1>
            <p className="text-gray-800">
              {userProfile?.data?.contactNumber || "NOT PROVIDED"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
              ADDRESS
            </h1>
            <p className="text-gray-800">
              {userProfile?.data?.address || "NOT PROVIDED"}
            </p>
          </div>
          <div>
            <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
              APPLIED DATE
            </h1>
            <p className="text-gray-800">
              {userProfile?.data?.appliedDate || "YET TO DO"}
            </p>
          </div>
          <div>
            <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
              VERIFIED DATE
            </h1>
            <p className="text-gray-800">
              {userProfile?.data?.verified === true
                ? userProfile?.data?.verifiedDate || "YET TO BE"
                : "YET TO BE"}
            </p>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
            Verification Status
          </h1>
          <p>
            {userProfile?.data?.verified === true ? "VERIFIED" : "NOT VERIFIED"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {Array.isArray(userProfile?.data?.evidences) &&
          userProfile.data.evidences.length > 0 &&
          userProfile.data.evidences[0].evidenceTwo ? (
            <img
              src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceTwo}`}
              alt="Evidence Two"
              className="w-full h-auto rounded-md border border-gray-200"
            />
          ) : (
            <p className="p-4 bg-gray-100 rounded-md text-gray-500 text-center">
              No evidence image available
            </p>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Change Password</h1>
      </div>
    </section>
  );
};

export default UAccountSettings;
