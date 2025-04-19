import Delete from "@/components/Delete";
import UpdateBook from "@/features/LibrarianAndAdmin/Books/UpdateBook";
import ViewBook from "@/features/LibrarianAndAdmin/Books/ViewBook";
import UpdateShelf from "@/features/LibrarianAndAdmin/Shelf/UpdateShelf";
import ViewShelf from "@/features/LibrarianAndAdmin/Shelf/ViewShelf";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";

export const columns = [
  {
    accessorKey: "shelfId",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "capacity",
    header: "Capacity",
  },

  {
    id: "category",
    header: "Category",
    accessorFn: (row) => row?.category?.name || "",
    cell: ({ row }) => row.original.category?.name || "",
  },
  {
    id: "available",
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
      const shelf = row.original;
      const isPresent = row?.original?.present;
      return (
        <div className="flex items-center justify-center gap-1">
          <div className="opacity-90">
            <ViewShelf id={shelf.shelfId} />
          </div>
          <button
            className={`cursor-not-allowed ${
              !isPresent ? "opacity-40" : "opacity-90"
            }`}
            disabled={!isPresent}
          >
            <UpdateShelf id={shelf.shelfId} />
          </button>
          <button
            className={`cursor-not-allowed ${
              !isPresent ? "opacity-40" : "opacity-90"
            }`}
            disabled={!isPresent}
          >
            <Delete id={shelf.shelfId} name={shelf.name} type={"shelf"} />
          </button>
        </div>
      );
    },
  },
];
