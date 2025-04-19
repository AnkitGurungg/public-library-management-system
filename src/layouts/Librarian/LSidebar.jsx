import {
  BookOpenText,
  Coins,
  Component,
  LayoutDashboard,
  SquareLibrary,
  Users,
  Compass,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const LSidebar = ({ sidebarToggle }) => {
    
  return (
    <div
      className={`fixed top-0 p-3 left-0 z-40 h-screen w-64 transition-transform duration-300 ease-in-out shadow-lg bg-white text-black ${
        sidebarToggle ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-1">
                <img src="/react.svg" alt="Logo" className="w-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-lg"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto">
            <div className="flex flex-col gap-1 text-black/80">
              <NavLink
                to="/librarian"
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
                to="/librarian/catalog"
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
                to="/librarian/books"
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
                to="/librarian/members"
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
                to="/librarian/categories"
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
                to="/librarian/fines"
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
                to="/librarian/shelfs"
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
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center text-xs text-white/40 bg-red-700">
          bijj hhkhk jj
        </div>
      </div>
    </div>
  );
};

export default LSidebar;
