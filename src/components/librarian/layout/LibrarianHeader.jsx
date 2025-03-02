import { NavLink } from "react-router-dom"

const LibrarianHeader = () => {
  return (
    <>
        <NavLink to="/librarian" ><img src="/react.svg" alt="Logo" /></NavLink>
        <p>Header</p>
    </>
  )
}

export default LibrarianHeader