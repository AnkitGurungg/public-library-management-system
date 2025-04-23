import { useFetchUserProfile } from "@/hooks/useFetchUserProfile";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import {
  Book,
  BookOpen,
  CreditCard,
  Heart,
  Settings,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const UPSidebar = () => {
  const {
    data: userProfile,
    refetch: refetchUserProfile,
    isLoading,
  } = useFetchUserProfile();

  const [a, setA] = useState([]);
  useEffect(() => {
    refetchUserProfile();
    setA(userProfile);
  }, []);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  return (
    <div className="bg-[#f1f1f1] top-0 ml-0 h-full w-64">
      <div className="p-4">
        <div className="flex justify-center mb-4">
          {Array.isArray(userProfile?.data?.evidences) &&
          userProfile.data.evidences.length > 0 &&
          userProfile.data.evidences[0].userImage ? (
            <img
              src={
                userProfile?.data?.evidences[0]?.userImage
                  ? `${BACKEND_SERVER_BASE_URL}${userProfile.data.evidences[0].userImage}`
                  : "/placeholder.svg"
              }
              alt="User profile"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-[150px] h-[150px] bg-[#206ea6] rounded-full flex items-center justify-center">
              <User className="h-16 w-16 text-white" />
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">
            {userProfile?.data?.name || "N/A"}
          </h2>
          <p className="text-sm text-gray-700">
            {userProfile?.data?.email || "N/A"}
          </p>
        </div>

        <nav className="space-y-2">
          <NavLink
            to="/member/profile/wish-list"
            className="flex items-center p-2 hover:bg-[#206ea6] hover:text-white rounded"
          >
            <Heart className="mr-2 h-5 w-5" />
            Wish List
          </NavLink>
          <NavLink
            to="/member/profile/borrowed-books"
            className="flex items-center p-2 hover:bg-[#206ea6] hover:text-white rounded"
          >
            <Book className="mr-2 h-5 w-5" />
            Borrowed Books
          </NavLink>
          <NavLink
            to="/member/profile/fines"
            className="flex items-center p-2 hover:bg-[#206ea6] hover:text-white rounded"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Fines
          </NavLink>
          <NavLink
            to="/member/profile/account-settings"
            className="flex items-center p-2 hover:bg-[#206ea6] hover:text-white rounded"
          >
            <Settings className="mr-2 h-5 w-5" />
            Account Settings
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default UPSidebar;
