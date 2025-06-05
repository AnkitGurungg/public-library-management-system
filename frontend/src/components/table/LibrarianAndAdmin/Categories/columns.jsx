import Delete from "@/components/Delete";
import RestoreBook from "@/components/Restore";
import UpdateCategory from "@/features/LibrarianAndAdmin/Categories/UpdateCategory";
import ViewCategory from "@/features/LibrarianAndAdmin/Categories/ViewCategory";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";
import { CgKey } from "react-icons/cg";

export const columns = [
  {
    accessorKey: "categoryId",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "startingNumber",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Starting Number
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "endingNumber",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ending Number
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "addedDate",
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
    accessorKey: "updatedDate",
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
    id: "present",
    accessorFn: (row) => String(row?.present) || "",
    header: "Available",
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
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      const isPresent = category?.present;
      console.log(category);
      console.log(isPresent);
      return (
        <div className="flex items-center justify-center gap-1">
          <div className="opacity-90">
            <ViewCategory id={category?.categoryId} />
          </div>

          <button
            className={`cursor-not-allowed ${
              !isPresent
                ? "opacity-40 cursor-not-allowed"
                : "opacity-90 cursor-pointer"
            }`}
            disabled={!isPresent}
          >
            <UpdateCategory id={category?.categoryId} />
          </button>

          <button
            className={`cursor-not-allowed ${
              !isPresent
                ? "opacity-40 cursor-not-allowed"
                : "opacity-90 cursor-pointer"
            }`}
            disabled={!isPresent}
          >
            <Delete
              id={category?.categoryId}
              name={category?.name}
              type={"category"}
            />
          </button>

          <button
            className={`cursor-not-allowed ${
              isPresent
                ? "opacity-40 cursor-not-allowed"
                : "opacity-90 cursor-pointer"
            }`}
            disabled={isPresent}
          >
            <RestoreBook
              id={category?.categoryId}
              name={category?.name}
              type={"category"}
            />
          </button>
        </div>
      );
    },
  },
];
