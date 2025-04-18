import Delete from "@/components/Delete";
import UpdateCategory from "@/features/LibrarianAndAdmin/Categories/UpdateCategory";
import ViewCategory from "@/features/LibrarianAndAdmin/Categories/ViewCategory";
import { ChevronsUpDown } from "lucide-react";

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
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      console.log(category);
      return (
        <div className="flex items-center justify-center gap-2">
          <ViewCategory id={category?.categoryId} />
          <UpdateCategory id={category?.categoryId} />
          <Delete
            id={category?.categoryId}
            name={category?.name}
            type={"category"}
          />
        </div>
      );
    },
  },
];
