import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserAppLayout, Home, Genres, LibrarianAppLayout, Dashboard, Books, Categories } from "./components/Index"

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserAppLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'genres',
          element: <Genres />
        },
      ],
    },
    {
      path: '/librarian',
      element: <LibrarianAppLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: 'books',
          element: <Books />
        },
        {
          path: 'categories',
          element: <Categories />
        },
      ],
    },
  ])

  return <RouterProvider router={router}/>
}

export default App