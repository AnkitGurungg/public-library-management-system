import { Button } from "@/components/ui/button";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";

export const columns = [
  {
    accessorKey: "getImageURL",
    header: "Book",
    cell: ({ row }) => {
      const imageUrl = row.getValue("getImageURL");
      const fullImageUrl = imageUrl
        ? `${BACKEND_SERVER_BASE_URL}${imageUrl}`
        : null;
      return fullImageUrl ? (
        <img
          src={fullImageUrl}
          alt="Book"
          className="h-12 w-10 object-cover rounded-md"
        />
      ) : (
        <span>No Image</span>
      );
    },
  },

  {
    accessorKey: "getTitle",
    header: "Title",
  },

  {
    id: "getCategoryName",
    header: "Category",
    accessorFn: (row) => row?.getCategoryName || "N/A",
    cell: ({ row }) => row?.original?.getCategoryName || "N/A",
  },

  {
    id: "getLanguage",
    header: "Language",
    accessorFn: (row) => row?.getLanguage || "N/A",
    cell: ({ row }) => row?.original?.getLanguage || "N/A",
  },

  {
    id: "getBorrowDate",
    cell: ({ row }) => row?.original?.getBorrowDate || "N/A",
    accessorFn: (row) => row?.getBorrowDate || "",
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
    id: "getDueDate",
    cell: ({ row }) => row?.original?.getDueDate || "N/A",
    accessorFn: (row) => row?.getDueDate || "N/A",
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
    accessorKey: "getReturnDate",
    header: "Returned Date",
    cell: ({ row }) => {
      const returnDate = row.getValue("getReturnDate");
      if (!returnDate) {
        return (
          <span className="bg-red-200 text-red-600 px-1 py-1 rounded-2xl text-[11px]">
            NOT RETURNED
          </span>
        );
      }
      return <span>{returnDate}</span>;
    },
  },

  // {
  //   accessorKey: "isExtended",
  //   header: "Extended",
  //   cell: ({ row }) => {
  //     const isExtended = row.getValue("isExtended");
  //     return isExtended ? "YES" : "NO";
  //   },
  // },

  {
    id: "isExtended",
    accessorFn: (row) => String(row?.isExtended) || "",
    header: "Extended",
    cell: ({ row }) =>
      row?.original?.isExtended ? (
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
];
