import Delete from "@/components/Delete";
import Restore from "@/components/Restore";
import UpdateBook from "@/features/LibrarianAndAdmin/Books/UpdateBook";
import ViewBook from "@/features/LibrarianAndAdmin/Books/ViewBook";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";

export const columns = [
  {
    accessorKey: "bookId",
    header: "ID",
  },

  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "author",
    header: "Author",
  },

  {
    id: "category",
    header: "Category",
    accessorFn: (row) => row?.category?.name || "",
    cell: ({ row }) => row.original.category?.name || "",
  },

  {
    accessorKey: "publishedDate",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "language",
    header: "Language",
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "shelf",
    header: "Shelf",
    accessorFn: (row) => row?.shelf?.name || "",
    cell: ({ row }) => row.original.shelf?.name || "",
  },

  {
    id: "available",
    accessorFn: (row) => String(row?.available) || "",
    header: "Available",
    cell: ({ row }) =>
      row?.original?.available ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-[#206ea6] bg-blue-100 rounded-md">
          <CheckCircle size={16} className="text-[#206ea6]" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-red-700 bg-red-100 rounded-md">
          <XCircle size={16} className="text-red-500" />
          NO
        </span>
      ),
  },

  {
    header: "Action",
    cell: ({ row }) => {
      const book = row.original;
      const isAvailable = book?.available;
      return (
        <div className="flex items-center justify-center gap-1">
          <div className={`opacity-90 cursor-pointer`}>
            <ViewBook id={book.bookId} />
          </div>

          <button
            className={`cursor-not-allowed ${
              !isAvailable
                ? "opacity-40 cursor-not-allowed"
                : "opacity-90 cursor-pointer"
            }`}
            disabled={!isAvailable}
          >
            <UpdateBook id={book.bookId} />
          </button>

          <button
            className={`${
              !isAvailable
                ? "opacity-40 cursor-not-allowed"
                : "opacity-90 cursor-pointer"
            }`}
            disabled={!isAvailable}
          >
            <Delete Delete id={book.bookId} name={book.title} type={"book"} />
          </button>

          <button
            className={`${
              isAvailable ? "opacity-40" : "opacity-90 cursor-pointer"
            }`}
            disabled={isAvailable}
          >
            <Restore Delete id={book.bookId} name={book.title} type={"book"} />
          </button>
        </div>
      );
    },
  },
];
