import { UAppLayout, Home, Genres } from "./indexes/User"
import { LAppLayout } from "./indexes/Librarian"
import { Dashboard, Catalog, Books, Categories, Members, Shelfs, Fines } from "./indexes/LibrarianAndAdmin"
import {} from "./indexes/Admin"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UAppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'genres', element: <Genres /> },
      ],
    },
    {
      path: '/librarian',
      element: <LAppLayout />,
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