import Delete from "@/components/Delete";
import UpdateBook from "@/features/LibrarianAndAdmin/Books/UpdateBook";
import ViewBook from "@/features/LibrarianAndAdmin/Books/ViewBook";
import { ChevronsUpDown } from "lucide-react";

export const columns = [
  {
    header: "ID",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowUsers?.userId || "N/A",
  },

  {
    id: "userName",
    header: "Name",
    accessorFn: (row) => row?.returns?.borrows?.borrowUsers?.name ?? "",
    cell: ({ getValue }) => getValue() || "N/A",
    filterFn: "includesString",
  },

  {
    header: "Title",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowBooks?.title || "N/A",
  },

  {
    header: "Category",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowBooks?.category?.name || "N/A",
  },

  {
    id: "borrowDate",
    accessorFn: (row) => {
      const date = row?.returns?.borrows?.borrowDate;
      return date ? new Date(date).getTime() : null;
    },
    header: ({ column }) => (
      <div className="flex justify-center w-full text-center">
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Borrow Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.original?.returns?.borrows?.borrowDate;
      return date || "N/A";
    },
  },

  {
    id: "dueDate",
    accessorFn: (row) => {
      const date = row?.returns?.borrows?.dueDate;
      return date ? new Date(date).getTime() : null;
    },
    header: ({ column }) => (
      <div className="flex justify-center w-full text-center">
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.original?.returns?.borrows?.dueDate;
      return date || "N/A";
    },
  },

  // {
  //   header: "Amount",
  //   cell: ({ row }) => row?.original?.totalFine || "N/A",
  // },

  {
    accessorFn: (row) => row?.totalFine ?? null,
    id: "amount",
    header: ({ column }) => (
      <div className="flex justify-center w-full text-center">
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Amount
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      </div>
    ),
    cell: ({ row }) => row?.original?.totalFine ?? "N/A",
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) ?? Infinity;
      const b = rowB.getValue(columnId) ?? Infinity;
      return a - b;
    },
  },

  {
    id: "returnDate",
    accessorFn: (row) => {
      const date = row?.returns?.returnDate;
      return date ? new Date(date).getTime() : null;
    },
    header: ({ column }) => (
      <div className="flex justify-center w-full text-center">
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.original?.returns?.returnDate;
      return date || "N/A";
    },
  },

  {
    header: "Status",
    cell: ({ row }) => (row?.original?.paidStatus ? "Yes" : "No" || "N/A"),
  },
];
