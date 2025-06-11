import { ChevronsUpDown } from "lucide-react";
import { CheckCircle, XCircle } from "lucide-react";

export const columns = [
  {
    id: "id",
    header: "ID",
    accessorFn: (row) => row.categoryId || "",
    cell: ({ row }) => row.original?.categoryId || "",
  },

  {
    id: "name",
    header: "Name",
    accessorFn: (row) => row.name || "",
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return value?.toLowerCase().includes(filterValue.toLowerCase());
    },
  },

  {
    id: "startingNumber",
    accessorFn: (row) => row?.startingNumber || "",
    cell: ({ row }) => row.original?.startingNumber || "",
    header: ({ column }) => (
      <div className="flex justify-center w-full text-center">
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Starting Number
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      </div>
    ),
  },

  {
    id: "endingNumber",
    accessorFn: (row) => row?.endingNumber || "",
    cell: ({ row }) => row.original?.endingNumber || "",
    header: ({ column }) => (
      <div className="flex justify-center w-full text-center">
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ending Number
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      </div>
    ),
  },

  {
    id: "addedDate",
    accessorFn: (row) => row.addedDate || "",
    cell: ({ row }) => row.original?.addedDate || "",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Added Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "active",
    accessorFn: (row) => String(row?.present) || "",
    header: "Active",
    cell: ({ row }) =>
      row?.original?.present ? (
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
    accessorFn: (row) => row?.borrowCount ?? null,
    id: "amount",
    header: ({ column }) => (
      <div className="flex justify-center w-full text-center">
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Borrow Count
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      </div>
    ),
    cell: ({ row }) => row?.original?.borrowCount ?? "N/A",
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) ?? Infinity;
      const b = rowB.getValue(columnId) ?? Infinity;
      return a - b;
    },
  },
];
