import Delete from "@/components/Delete";
import RestoreBook from "@/components/Restore";
import UpdateLibrarian from "@/features/Admin/UpdateLibrarian";
import ViewLibrarian from "@/features/Admin/ViewLibrarian";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";

export const columns = [
  {
    accessorKey: "userId",
    header: "LID",
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "contactNumber",
    header: "Contact",
  },

  {
    accessorKey: "address",
    header: "Address",
  },

  {
    id: "addedDate",
    cell: ({ row }) => row?.original?.appliedDate || "N/A",
    accessorFn: (row) => row?.appliedDate || "",
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
    id: "deleted",
    accessorFn: (row) => String(row?.present) || "",
    header: "Deleted",
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
      const member = row.original;
      const isVerified = member?.verified;
      const isPresent = member?.present;
      return (
        <div className="flex items-center justify-center gap-1">
          <div className="opacity-90">
            <ViewLibrarian id={member.userId} type={"librarian"} />
          </div>

          <button
            className={`cursor-not-allowed ${
              !isPresent ? "opacity-40" : "opacity-90"
            }`}
            disabled={!isPresent}
          >
            <UpdateLibrarian id={member.userId} />
          </button>

          <button
            className={`cursor-not-allowed ${
              !isPresent ? "opacity-40" : "opacity-90"
            }`}
            disabled={!isPresent}
          >
            <Delete id={member.userId} name={member.name} type={"user"} />
          </button>

          <button
            className={`${
              isPresent ? "opacity-40" : "opacity-90 cursor-pointer"
            }`}
            disabled={isPresent}
          >
            <RestoreBook
              id={member?.userId}
              name={member?.name}
              type={"user"}
              whatUser={"librarian"}
            />
          </button>
        </div>
      );
    },
  },
];
