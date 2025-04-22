import { UserContext } from "@/contexts/UserContext";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

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
  User,
  ShieldUser,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const ASidebar = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const [reportsOpen, setReportsOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 p-3 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out shadow-lg bg-white text-black ${
        sidebarToggle ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white rounded-lg flex justify-center items-center p-2 ml-3">
                <img src="/logo/logo.png" alt="Logo" className="w-48 mx-auto" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto">
            <div className="flex flex-col gap-1 text-black/80">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black"
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/admin/catalog"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black "
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <Compass size={20} />
                <span>Catalog</span>
              </NavLink>

              <NavLink
                to="/admin/books"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black"
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <BookOpenText size={20} />
                <span>Books</span>
              </NavLink>

              <NavLink
                to="/admin/members"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black "
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <Users size={20} />
                <span>Members</span>
              </NavLink>

              <NavLink
                to="/admin/categories"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black "
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <Component size={20} />
                <span>Categories</span>
              </NavLink>

              <NavLink
                to="/admin/fines"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black "
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <Coins size={20} />
                <span>Fines</span>
              </NavLink>

              <NavLink
                to="/admin/shelfs"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black "
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <SquareLibrary size={20} />
                <span>Shelfs</span>
              </NavLink>
              <NavLink
                to="/admin/librarians"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium bg-[#d9d9d9] text-black "
                    : "flex items-center gap-3 px-4 py-3 rounded-md text-base transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                }
              >
                <ShieldUser size={20} />
                <span>Librarians</span>
              </NavLink>

              <div className="mb-2">
                <button
                  onClick={() => setReportsOpen(!reportsOpen)}
                  className="cursor-pointer w-full flex items-center justify-between px-4 py-3 font-medium hover:bg-[#d9d9d9] hover:text-black duration-200 ease-in-out gap-3 rounded-md text-base transition-colors"
                >
                  <div className="flex items-center gap-4 ">
                    <span className="">
                      <File size={20} />
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
                <ScrollArea>
                  <div
                    className={`mt-2 space-y-1 ${
                      reportsOpen ? "block" : "hidden"
                    }`}
                  >
                    <NavLink
                      to="reports/most-popular-category"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 px-3 ml-3 py-3 rounded-md text-sm transition-colors font-medium bg-[#d9d9d9] text-black "
                          : "flex items-center gap-2 px-3 ml-3 py-3 rounded-md text-sm transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                      }
                    >
                      <FaMoneyBillTrendUp size={15} />
                      Most Popular Category
                    </NavLink>
                    <NavLink
                      to="reports/most-borrowing-members"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 px-3 ml-3 py-3 rounded-md text-sm transition-colors font-medium bg-[#d9d9d9] text-black w-f"
                          : "flex items-center gap-2 px-3 ml-3 py-3 rounded-md text-sm transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                      }
                    >
                      <UserCog size={15} />
                      Most Borrowing Members
                    </NavLink>
                    <NavLink
                      to="reports/member-unpaid-fines"
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 px-3 ml-3 py-3 rounded-md text-sm transition-colors font-medium bg-[#d9d9d9] text-black "
                          : "flex items-center gap-2 px-3 ml-3 py-3 rounded-md text-sm transition-colors font-medium hover:bg-[#d9d9d9] hover:text-black "
                      }
                    >
                      <FaMoneyBillTrendUp size={15} />
                      Member Unpaid Fines
                    </NavLink>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="pt-6 border-t border-white/10 text-center text-xs text-white/40 bg-red-700">
          
        </div> */}
      </div>
    </div>
  );
};

export default ASidebar;
