import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";

export const columns = [
  {
    accessorKey: "imageURL",
    header: "Book",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageURL");
      const fullImageUrl = imageUrl
        ? `${BACKEND_SERVER_BASE_URL}/${imageUrl}`
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
    accessorKey: "title",
    header: "Title",
  },

  {
    id: "categoryName",
    header: "Category",
    accessorFn: (row) => row?.categoryName || "N/A",
    cell: ({ row }) => row?.original?.categoryName || "N/A",
  },

  {
    id: "language",
    header: "Language",
    accessorFn: (row) => row?.language || "N/A",
    cell: ({ row }) => row?.original?.language || "N/A",
  },

  {
    id: "borrowDate",
    cell: ({ row }) => row?.original?.borrowDate || "N/A",
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
    cell: ({ row }) => row?.original?.dueDate || "N/A",
    accessorFn: (row) => row?.dueDate || "N/A",
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
    accessorKey: "returnDate",
    header: "Returned Date",
    cell: ({ row }) => {
      const returnDate = row.getValue("returnDate");
      if (!returnDate) {
        return (
          <span className="bg-red-600 font-medium text-white opacity-80 px-1 py-1 rounded-2xl text-[11px]">
            NOT RETURNED
          </span>
        );
      }
      return <span>{returnDate}</span>;
    },
  },

  {
    id: "extended",
    accessorFn: (row) => String(row?.extended) || "",
    header: "Extended",
    cell: ({ row }) =>
      row?.original?.extended ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-[#206ea6] text-white rounded-md">
          <CheckCircle size={16} className="text-white" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-red-600 opacity-80 text-white rounded-md">
          <XCircle size={16} className="text-white" />
          NO
        </span>
      ),
  },

  {
    id: "returnStatus",
    accessorFn: (row) => String(row?.returnStatus) || "",
    header: "Returned",
    cell: ({ row }) =>
      row?.original?.returnStatus ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-[#206ea6] text-white rounded-md">
          <CheckCircle size={16} className="text-white" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-red-600 opacity-80 text-white rounded-md">
          <XCircle size={16} className="text-white" />
          NO
        </span>
      ),
  },
];
