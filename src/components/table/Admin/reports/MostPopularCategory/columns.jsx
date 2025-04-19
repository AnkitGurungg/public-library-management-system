import { ChevronsUpDown } from "lucide-react";

export const columns = [
  {
    id: "id",
    header: "ID",
    cell: ({ row }) => row.original.category?.categoryId || "",
    accessorFn: (row) => row.original?.category?.categoryId || "",
  },

  {
    id: "name",
    header: "Name",
    accessorFn: (row) => row.category?.name || "",
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return value?.toLowerCase().includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => row.original.category?.name || "",
  },

  {
    id: "startingNumber",
    accessorFn: (row) => row?.category?.startingNumber || "",
    cell: ({ row }) => row.original.category?.startingNumber || "",
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
    accessorFn: (row) => row?.category?.endingNumber || "",
    cell: ({ row }) => row.original.category?.endingNumber || "",
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
    cell: ({ row }) => row.original.category?.addedDate || "",
    accessorFn: (row) => row.category?.addedDate || "",
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
    id: "updatedDate",
    cell: ({ row }) => row.original.category?.updatedDate || "",
    accessorFn: (row) => row.category?.updatedDate || "",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
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
