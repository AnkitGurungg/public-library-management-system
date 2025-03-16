import { NavLink } from "react-router-dom";

const ASidebar = () => {
  return (
    <div className="w-64 h-screen bg-white text-black fixed top-0 left-0">
      <div className="h-16">
        <NavLink to="/admin">
          <img src="../../../react.svg" alt="Logo" className="mb-6" />
        </NavLink>
      </div>
      <div>
        <div className="py-2">
          <NavLink
            to="/admin"
            className="block py-2 px-4 hover:bg-gray-700"
            activeclassname="bg-blue-600"
          >
            Dashboard
          </NavLink>
        </div>
        <div className="py-2">
          <NavLink
            to="/admin/catalog"
            className="block py-2 px-4 hover:bg-gray-700"
            activeclassname="bg-blue-600"
          >
            Catalog
          </NavLink>
        </div>
        <div>
          <div className="py-2">
            <NavLink
              to="/admin/books"
              className="block py-2 px-4 hover:bg-gray-700"
              activeclassname="bg-blue-600"
            >
              Books
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/admin/members"
              className="block py-2 px-4 hover:bg-gray-700"
              activeclassname="bg-blue-600"
            >
              Members
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/admin/categories"
              className="block py-2 px-4 hover:bg-gray-700"
              activeclassname="bg-blue-600"
            >
              Categories
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/admin/fines"
              className="block py-2 px-4 hover:bg-gray-700"
              activeclassname="bg-blue-600"
            >
              Fines
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/admin/shelfs"
              className="block py-2 px-4 hover:bg-gray-700"
              activeclassname="bg-blue-600"
            >
              Shelfs
            </NavLink>
          </div>

          <div className="py-2">
            <NavLink
              to="/admin/librarians"
              className="block py-2 px-4 hover:bg-gray-700"
              activeclassname="bg-blue-600"
            >
              Librarians
            </NavLink>
          </div>
          <div className="py-2">
            <NavLink
              to="/admin/reports"
              className="block py-2 px-4 hover:bg-gray-700"
              activeclassname="bg-blue-600"
            >
              Reports
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ASidebar;