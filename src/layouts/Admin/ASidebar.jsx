import { UserContext } from "@/contexts/UserContext";
import HoverReports from "@/features/Admin/Reports/HoverReports";
import HoverSettings from "@/features/LibrarianAndAdmin/Settings/HoverSettings";
import {
  BookOpenText,
  Coins,
  Component,
  File,
  LayoutDashboard,
  SquareLibrary,
  UserCog,
  Users,
  Compass,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ASidebar = () => {
  const { userInfo, loading } = useContext(UserContext);
  const [userRole, setUserRole] = useState(userInfo.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.role) {
      setUserRole(userInfo.role);
    }
  }, [userInfo]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-64 h-screen bg-white text-black fixed top-0 left-0 flex-col justify-between">
      <div className="h-16">
        <NavLink to="/librarian">
          <img src="../../../react.svg" alt="Logo" className="mb-6" />
        </NavLink>
      </div>
      <div>
        <div className="py-2">
          <NavLink
            to="/librarian"
            className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
            activeclassname="bg-blue-600"
          >
            <LayoutDashboard className="mr-2" />
            Dashboard
          </NavLink>
        </div>
        <div className="py-2">
          <NavLink
            to="/librarian/catalog"
            className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
            activeclassname="bg-blue-600"
          >
            <Compass className="mr-2" />
            Catalog
          </NavLink>
        </div>
        <div>
          <div className="py-2">
            <NavLink
              to="/librarian/books"
              className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
              activeclassname="bg-blue-600"
            >
              <BookOpenText className="mr-2" />
              Books
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/librarian/members"
              className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
              activeclassname="bg-blue-600"
            >
              <Users className="mr-2" />
              Members
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/librarian/categories"
              className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
              activeclassname="bg-blue-600"
            >
              <Component className="mr-2" />
              Categories
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/librarian/fines"
              className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
              activeclassname="bg-blue-600"
            >
              <Coins className="mr-2" />
              Fines
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/librarian/shelfs"
              className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
              activeclassname="bg-blue-600"
            >
              <SquareLibrary className="mr-2" />
              Shelfs
            </NavLink>
          </div>

          {/* {userRole === "ROLE_ADMIN" && ( */}
          <div>
            <div className="py-2">
              <NavLink
                to="/admin/librarians"
                className="py-2 px-4 hover:bg-gray-700 hover:text-white flex flex-row items-center rounded"
                activeclassname="bg-blue-600"
              >
                <UserCog className="mr-2" />
                Librarians
              </NavLink>
            </div>
            <HoverReports />
          </div>
          {/* )} */}
        </div>
      </div>
      <div className="py-2">
        <HoverSettings />
      </div>
    </div>
  );
};

export default ASidebar;
