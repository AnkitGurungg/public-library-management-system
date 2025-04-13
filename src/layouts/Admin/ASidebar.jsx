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
  Gauge,
  MapPinned,
  Tags,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const ASidebar = () => {
  const { userInfo, loading } = useContext(UserContext);
  const [userRole, setUserRole] = useState(userInfo.role);
  const navigate = useNavigate();
  const [reportsOpen, setReportsOpen] = useState(false);

  useEffect(() => {
    if (userInfo?.role) {
      setUserRole(userInfo.role);
    }
  }, [userInfo]);

  if (loading) return <p>Loading...</p>;

  return (
    // <div className="w-64 h-screen bg-white text-black fixed top-0 left-0 flex-col justify-between">
    //   <div className="h-16">
    //     <Link to="/librarian">
    //       <img src="../../../react.svg" alt="Logo" className="mb-6" />
    //     </Link>
    //   </div>
    //   <div>
    //     <div className="py-2">
    //       <Link
    //         to="/librarian"
    //         className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
    //         activeclassname="bg-blue-600"
    //       >
    //         <LayoutDashboard className="mr-2" />
    //         Dashboard
    //       </Link>
    //     </div>
    //     <div className="py-2">
    //       <Link
    //         to="/librarian/catalog"
    //         className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
    //         activeclassname="bg-blue-600"
    //       >
    //         <Compass className="mr-2" />
    //         Catalog
    //       </Link>
    //     </div>
    //     <div>
    //       <div className="py-2">
    //         <Link
    //           to="/librarian/books"
    //           className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
    //           activeclassname="bg-blue-600"
    //         >
    //           <BookOpenText className="mr-2" />
    //           Books
    //         </Link>
    //       </div>
    //       <div className="py-2">
    //         <Link
    //           to="/librarian/members"
    //           className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
    //           activeclassname="bg-blue-600"
    //         >
    //           <Users className="mr-2" />
    //           Members
    //         </Link>
    //       </div>
    //       <div className="py-2">
    //         <Link
    //           to="/librarian/categories"
    //           className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
    //           activeclassname="bg-blue-600"
    //         >
    //           <Component className="mr-2" />
    //           Categories
    //         </Link>
    //       </div>
    //       <div className="py-2">
    //         <Link
    //           to="/librarian/fines"
    //           className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
    //           activeclassname="bg-blue-600"
    //         >
    //           <Coins className="mr-2" />
    //           Fines
    //         </Link>
    //       </div>
    //       <div className="py-2">
    //         <Link
    //           to="/librarian/shelfs"
    //           className="py-2 px-4 hover:bg-gray-600 hover:text-white flex flex-row items-center rounded"
    //           activeclassname="bg-blue-600"
    //         >
    //           <SquareLibrary className="mr-2" />
    //           Shelfs
    //         </Link>
    //       </div>

    //       {/* {userRole === "ROLE_ADMIN" && ( */}
    //       <div>
    //         <div className="py-2">
    //           <Link
    //             to="/admin/librarians"
    //             className="py-2 px-4 hover:bg-gray-700 hover:text-white flex flex-row items-center rounded"
    //             activeclassname="bg-blue-600"
    //           >
    //             <UserCog className="mr-2" />
    //             Librarians
    //           </Link>
    //         </div>
    //         <HoverReports />
    //       </div>
    //       {/* )} */}
    //     </div>
    //   </div>
    //   <div className="py-2">
    //     <HoverSettings />
    //   </div>
    // </div>

    <div className="fixed top-0 left-0 z-40 h-screen bg-primary transition-transform duration-300 ease-in-out text-white p-4 w-64">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-1">
                <img src="/logo.png" alt="Logo" className="w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg">Sajilo Ticket.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto">
            <div className="flex flex-col gap-1">
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Gauge size={20} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/admin/catalog"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <MapPinned size={20} />
                <span>Catalog</span>
              </Link>

              <Link
                to="/admin/books"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Tags size={20} />
                <span>Books</span>
              </Link>

              <Link
                to="/admin/categories"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Users size={20} />
                <span>Categories</span>
              </Link>

              <Link
                to="/admin/fines"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Users size={20} />
                <span>Fines</span>
              </Link>

              <Link
                to="/admin/shelfs"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Users size={20} />
                <span>Shelfs</span>
              </Link>
              <Link
                to="/admin/librarians"
                className="flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <Users size={20} />
                <span>Librarians</span>
              </Link>

              <div className="mb-2">
                <button
                  onClick={() => setReportsOpen(!reportsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 duration-200 ease-in-out gap-3 rounded-md text-base transition-colors  text-white"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-slate-300">
                      <UserCog size={20} />
                    </span>
                    <span className="text-base">Reports</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform duration-200 ${
                      reportsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`mt-2 space-y-1 ${
                    reportsOpen ? "block" : "hidden"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center text-xs text-white/40"></div>
      </div>
    </div>
  );
};

export default ASidebar;
