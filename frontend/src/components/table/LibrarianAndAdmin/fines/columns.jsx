import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";

export const columns = [
  {
    header: "FID",
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
    id: "title",
    header: "Title",
    accessorFn: (row) => row?.returns?.borrows?.borrowBooks?.title || "N/A",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowBooks?.title || "N/A",
  },

  {
    id: "category",
    header: "Category",
    accessorFn: (row) =>
      row?.returns?.borrows?.borrowBooks?.category?.name || "",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowBooks?.category?.name || "",
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
          Returned Date
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
    id: "status",
    accessorFn: (row) => String(row?.paidStatus) || "",
    header: "Status",
    cell: ({ row }) =>
      row?.original?.paidStatus ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-[#206ea6] bg-blue-100 rounded-md">
          <CheckCircle size={16} className="text-[#206ea6]" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md">
          <XCircle size={16} className="text-red-500" />
          NO
        </span>
      ),
  },
];
