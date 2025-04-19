import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";

export const columns = [
  {
    id: "id",
    header: "ID",
    accessorFn: (row) => row?.user?.userId || "",
    cell: ({ row }) => row.original?.user?.userId || "",
  },

  {
    id: "name",
    header: "Name",
    accessorFn: (row) => row?.user?.name || "",
    cell: ({ row }) => row.original?.user?.name || "",
  },

  {
    id: "id",
    header: "Email",
    accessorFn: (row) => row?.user?.email || "",
    cell: ({ row }) => row.original?.user?.email || "",
  },

  {
    id: "appliedDate",
    cell: ({ row }) => row.original?.user?.appliedDate || "",
    accessorFn: (row) => row?.user?.appliedDate || "",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Applied Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "verifiedDate",
    cell: ({ row }) => row.original?.user?.verifiedDate || "",
    accessorFn: (row) => row?.user?.verifiedDate || "",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Verified Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "present",
    accessorFn: (row) => String(row?.user?.present) || "",
    header: "Present",
    cell: ({ row }) =>
      row?.original?.user?.present ? (
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
