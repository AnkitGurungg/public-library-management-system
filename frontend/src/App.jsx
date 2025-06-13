import { UAppLayout, Home, Profile } from "./indexes/User";
import { LAppLayout } from "./indexes/Librarian";
import { AAppLayout, Librarians, Reports } from "./indexes/Admin";
import {
  Dashboard,
  Catalog,
  Books,
  Categories,
  Members,
  Shelfs,
  Fines,
} from "./indexes/LibrarianAndAdmin";
import DefaultPage from "./pages/DefaultPage";
import { UserProvider } from "./contexts/UserProvider";
import UPApplayout from "./layouts/UserProfile/UPApplayout";
import UBorrowedBooks from "./features/User/Profiile/UBorrowedBooks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UAccountSettings from "./features/User/Profiile/UAccountSettings";
import GenreFilteredBooks from "./features/User/Home/GenreFilteredBooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import WishList from "./features/User/WishList/WishList";
import MemberFines from "./features/User/Fines/MemberFines";
import AllTopBorrowedBooks from "./features/User/Home/AllTopBorrowedBooks";
import NewArrivalBooks from "./features/User/Home/NewArrivalBooks";
import { MostPopularCategory } from "./features/Admin/Reports/MostPopularCategory";
import MostActiveMembers from "./features/Admin/Reports/MostBorrowingMembers";
import MemberUnpaidFines from "./features/Admin/Reports/MemberUnpaidFines";
import MostBorrowingMembers from "./features/Admin/Reports/MostBorrowingMembers";
import ViewSpecificBook from "./features/User/Home/ViewSpecificBook";
import AboutUs from "./layouts/User/About/AboutUs";
import ContactUs from "./layouts/User/About/ContactUs";
import RecentlyPublishedBooks from "./features/User/Home/RecentlyPublishedBooks";

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UAppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "books/genres/:categoryId", element: <GenreFilteredBooks /> },
        { path: "books/book/:bookId", element: <ViewSpecificBook /> },
        { path: "popular-choices", element: <AllTopBorrowedBooks /> },
        { path: "new-arrivals", element: <NewArrivalBooks /> },
        { path: "recently-published", element: <RecentlyPublishedBooks /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "contact-us", element: <ContactUs /> },
      ],
    },

    {
      path: "/member/profile",
      element: <UPApplayout />,
      children: [
        { index: true, element: <UAccountSettings /> },
        { path: "wish-list", element: <WishList /> },
        { path: "borrowed-books", element: <UBorrowedBooks /> },
        { path: "fines", element: <MemberFines /> },
        { path: "account-settings", element: <UAccountSettings /> },
        { path: "*", element: <DefaultPage /> },
      ],
    },

    {
      path: "/librarian",
      element: <LAppLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "catalog", element: <Catalog /> },
        { path: "books", element: <Books /> },
        { path: "members", element: <Members /> },
        { path: "categories", element: <Categories /> },
        { path: "shelfs", element: <Shelfs /> },
        { path: "fines", element: <Fines /> },
        { path: "*", element: <DefaultPage /> },
      ],
    },
    {
      path: "/admin",
      element: <AAppLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "catalog", element: <Catalog /> },
        { path: "books", element: <Books /> },
        { path: "members", element: <Members /> },
        { path: "categories", element: <Categories /> },
        { path: "shelfs", element: <Shelfs /> },
        { path: "fines", element: <Fines /> },
        { path: "librarians", element: <Librarians /> },
        {
          path: "reports/most-popular-category",
          element: <MostPopularCategory />,
        },
        {
          path: "reports/most-borrowing-members",
          element: <MostBorrowingMembers />,
        },
        {
          path: "reports/member-unpaid-fines",
          element: <MemberUnpaidFines />,
        },
        { path: "*", element: <DefaultPage /> },
      ],
    },

    {
      path: "*",
      element: <DefaultPage />,
    },
  ]);

  return (
    <>
      <Toaster />
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </UserProvider>
    </>
  );
};

export default App;
