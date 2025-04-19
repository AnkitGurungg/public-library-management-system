import ReturnBook from "@/features/LibrarianAndAdmin/Catalog/ReturnBook";
import {
  CheckCircle,
  ChevronsUpDown,
  CircleCheckBig,
  XCircle,
} from "lucide-react";

export const columns = [
  {
    id: "bookId",
    header: "Book ID",
    cell: ({ row }) => row?.original?.borrowBooks?.bookId || "",
  },

  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => row?.original?.borrowUsers?.userId || "",
  },

  {
    id: "name",
    accessorFn: (row) => row?.borrowUsers?.name || "",
    header: "Name",
    cell: ({ row }) => row?.original?.borrowUsers?.name || "",
  },

  {
    id: "borrowedDate",
    cell: ({ row }) => row?.original?.borrowDate || "",
    accessorFn: (row) => row?.borrowDate || "",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Borrowed Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "dueDate",
    cell: ({ row }) => row?.original?.dueDate || "",
    accessorFn: (row) => row?.dueDate || "",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "extended",
    accessorFn: (row) => String(row?.extended) || "",
    header: "Extended",
    cell: ({ row }) =>
      row?.original?.extended ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md">
          <CheckCircle size={16} className="text-green-500" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md">
          <XCircle size={16} className="text-red-500" />
          NO
        </span>
      ),
  },

  {
    id: "returnStatus",
    accessorFn: (row) => String(row?.returnStatus) || "",
    header: "Return Status",
    cell: ({ row }) =>
      row?.original?.returnStatus ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md">
          <CheckCircle size={16} className="text-green-500" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md">
          <XCircle size={16} className="text-red-500" />
          NO
        </span>
      ),
  },

  {
    header: "Action",
    cell: ({ row }) => {
      const borrow = row?.original;

      return borrow.returnStatus ? (
        <div className="relative group flex items-center justify-center">
          <CircleCheckBig className="text-green-500" />
          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Already Returned
          </span>
        </div>
      ) : (
        <div className="relative group flex items-center justify-center">
          <ReturnBook id={borrow.borrowId} />
          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Return Book
          </span>
        </div>
      );
    },
  },
];
