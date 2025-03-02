import { Outlet } from "react-router-dom"
import LibrarianSidebar from "./LibrarianSidebar"
import LibrarianHeader from "./LibrarianHeader"

const LibrarianAppLayout = () => {
  return (
    <>
      <LibrarianHeader />
      <LibrarianSidebar />
      <Outlet />
    </>
  )
}

export default LibrarianAppLayout