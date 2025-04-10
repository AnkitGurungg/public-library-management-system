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
import { useState, useEffect } from "react";
import DefaultPage from "./pages/DefaultPage";
import { UserProvider } from "./contexts/UserProvider";
import Payments from "./features/User/Payment/Payments";
import WishList from "./features/User/WishList/WishList";
import UPApplayout from "./layouts/UserProfile/UPApplayout";
import SpecificBook from "./features/User/Home/SpecificBook";
import UBorrowedBooks from "./features/User/Profiile/UBorrowedBooks";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UAccountSettings from "./features/User/Profiile/UAccountSettings";
import GenreFilteredBooks from "./features/User/Home/GenreFilteredBooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UAppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "books/genres/:categoryId", element: <GenreFilteredBooks /> },
        { path: "books/book/:bookId", element: <SpecificBook /> },
        {
          path: "member/profile",
          element: <UPApplayout />,
          children: [
            { index: true, element: <UAccountSettings /> },
            { path: "wish-list", element: <WishList /> },
            { path: "borrowed-books", element: <UBorrowedBooks /> },
            { path: "payments", element: <Payments /> },
            { path: "account-settings", element: <UAccountSettings /> },
            { path: "*", element: <DefaultPage /> },
          ],
        },
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
        { path: "reports/catalog-summary", element: <Reports /> },
        { path: "reports/top-borrowed-books", element: <Reports /> },
        { path: "*", element: <DefaultPage /> },
      ],
    },

    {
      path: "*",
      element: <DefaultPage />,
    },
  ]);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
