import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { useEffect, useState } from "react";
import KYC from "../Register/KYC";
import { BookOpen, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

const UAccountSettings = () => {
  const [userData, setUserData] = useState({
    fullName: "NOT PROVIDED",
    email: "anushagurung313@gmail.com",
    phone: "3",
    address: "Pokhara-29",
    appliedDate: "2025-04-09",
    verifiedDate: "2025-04-09",
    verificationStatus: "VERIFIED",
  });
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

    // <section className="ml-64 p-8 bg-gray-50 min-h-screen">
    //   <div className="mb-8">
    //     <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
    //     <p className="text-gray-600">
    //       Here, you can see and manage your Information.
    //     </p>
    //   </div>

    //   <div className="flex flex-row justify-between items-center mb-6">
    //     <h1 className="text-2xl font-bold">Personal Information</h1>
    //     <div className="relative group inline-block">
    //       <button
    //         disabled={userProfile?.data?.verified}
    //         className={`px-6 py-2 rounded-md transition-colors duration-200 font-medium
    //       ${
    //         userProfile?.data?.verified
    //           ? "text-gray-500 cursor-not-allowed"
    //           : "text-gray-800 hover:text-[#206ea6] cursor-pointer border-none"
    //       }
    //     `}
    //       >
    //         <KYC />
    //       </button>
    //       <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform text-sm bg-[#f1f1f1] text-[#65768f] px-2 py-1 rounded whitespace-nowrap z-10">
    //         {userProfile?.data?.verified
    //           ? "Already verified"
    //           : "Please fill up KYC"}
    //       </span>
    //     </div>
    //   </div>

    //   <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
    //       <div>
    //         <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
    //           FULL NAME
    //         </h1>
    //         <p className="text-gray-800">
    //           {userProfile?.data?.name || "NOT PROVIDED"}
    //         </p>
    //       </div>
    //       <div>
    //         <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
    //           EMAIL
    //         </h1>
    //         <p className="text-gray-800">
    //           {userProfile?.data?.email || "NOT PROVIDED"}
    //         </p>
    //       </div>
    //       <div>
    //         <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
    //           PHONE NUMBER
    //         </h1>
    //         <p className="text-gray-800">
    //           {userProfile?.data?.contactNumber || "NOT PROVIDED"}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
    //       <div>
    //         <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
    //           ADDRESS
    //         </h1>
    //         <p className="text-gray-800">
    //           {userProfile?.data?.address || "NOT PROVIDED"}
    //         </p>
    //       </div>
    //       <div>
    //         <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
    //           APPLIED DATE
    //         </h1>
    //         <p className="text-gray-800">
    //           {userProfile?.data?.appliedDate || "YET TO DO"}
    //         </p>
    //       </div>
    //       <div>
    //         <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
    //           VERIFIED DATE
    //         </h1>
    //         <p className="text-gray-800">
    //           {userProfile?.data?.verified === true
    //             ? userProfile?.data?.verifiedDate || "YET TO BE"
    //             : "YET TO BE"}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="mb-8">
    //       <h1 className="uppercase font-bold text-sm text-gray-500 mb-2">
    //         Verification Status
    //       </h1>
    //       <p>
    //         {userProfile?.data?.verified === true ? "VERIFIED" : "NOT VERIFIED"}
    //       </p>
    //     </div>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //       {Array.isArray(userProfile?.data?.evidences) &&
    //       userProfile.data.evidences.length > 0 &&
    //       userProfile.data.evidences[0].evidenceOne ? (
    //         <img
    //           src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceOne}`}
    //           alt="Evidence One"
    //           className="w-full h-auto rounded-md border border-gray-200"
    //         />
    //       ) : (
    //         <p className="p-4 bg-gray-100 rounded-md text-gray-500 text-center">
    //           No evidence image available
    //         </p>
    //       )}

    //       {Array.isArray(userProfile?.data?.evidences) &&
    //       userProfile.data.evidences.length > 0 &&
    //       userProfile.data.evidences[0].evidenceTwo ? (
    //         <img
    //           src={`${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].evidenceTwo}`}
    //           alt="Evidence Two"
    //           className="w-full h-auto rounded-md border border-gray-200"
    //         />
    //       ) : (
    //         <p className="p-4 bg-gray-100 rounded-md text-gray-500 text-center">
    //           No evidence image available
    //         </p>
    //       )}
    //     </div>
    //   </div>
    //   <div>
    //     <h1 className="text-2xl font-bold">Change Password</h1>
    //   </div>
    // </section>

    <div className="flex-1 ml-64 p-3">
      <header className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Booksmandala</h1>
          <span className="text-lg">Books</span>
        </div>
        <div className="w-96">
          <input
            type="text"
            placeholder="What do you want to read?"
            className="w-full p-2 bg-gray-100 rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <button className="p-2">
            <BookOpen className="h-5 w-5" />
          </button>
          <button className="p-2">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Account Settings
          </h2>
          <p className="text-gray-600">
            Here, you can see and manage your information.
          </p>
        </div>

        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Personal Information
            </h3>
            <span className="text-blue-600 font-medium">KYC</span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <InfoField
              label="FULL NAME"
              value={userData.fullName || "Ankit Gurung"}
            />
            <InfoField
              label="EMAIL"
              value={userData.email || "ankitgurun123@gmil,cm"}
            />
            <InfoField
              label="PHONE NUMBER"
              value={userData.phone || "980377434"}
            />
            <InfoField
              label="ADDRESS"
              value={userData.address || "pokahra 29"}
            />
            <InfoField
              label="APPLIED DATE"
              value={userData.appliedDate || "49390"}
            />
            <InfoField
              label="VERIFIED DATE"
              value={userData.verifiedDate || "f493843"}
            />
            <InfoField
              label="VERIFICATION STATUS"
              value={userData.verificationStatus || "Yes"}
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-100 p-6 rounded-md flex items-center justify-center text-gray-500">
              No evidence image available
            </div>
            <div className="bg-gray-100 p-6 rounded-md flex items-center justify-center text-gray-500">
              No evidence image available
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Update
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md">
                Enable
              </button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default UAccountSettings;
