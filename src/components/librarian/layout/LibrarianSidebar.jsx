import { NavLink } from "react-router-dom"

const LibrarianSidebar = () => {
    return (
        <div>

            <NavLink to="/librarian/books">Books</NavLink>
            <br />
            <NavLink to="/librarian/categories">Categories</NavLink>
        </div>
    )
}

export default LibrarianSidebar