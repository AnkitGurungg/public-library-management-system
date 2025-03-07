import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserAppLayout, Home, Genres, LibrarianAppLayout, Dashboard, Catalog, Books, Members, Categories, Shelfs, Fines } from "./components/Index"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserAppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'genres', element: <Genres /> },
      ],
    },
    {
      path: '/librarian',
      element: <LibrarianAppLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'catalog', element: <Catalog /> },
        { path: 'books', element: <Books /> },
        { path: 'members', element: <Members /> },
        { path: 'categories', element: <Categories /> },
        { path: 'shelfs', element: <Shelfs /> },
        { path: 'fines', element: <Fines /> },
      ],
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App