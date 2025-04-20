import Delete from "@/components/Delete";
import ViewLibrarian from "@/features/Admin/ViewLibrarian";
import VerifyMember from "@/features/LibrarianAndAdmin/Members/VerifyMember";
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
    id: "present",
    accessorFn: (row) => String(row?.present) || "",
    header: "Available",
    cell: ({ row }) =>
      row?.original?.present ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#206ea6] bg-blue-100 rounded-md">
          <CheckCircle size={16} className="text-[#206ea6]" />
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
              isVerified || !isPresent ? "opacity-40" : "opacity-90"
            }`}
            disabled={isVerified || !isPresent}
          >
            <VerifyMember id={member.userId} />
          </button>

          <button
            className={`cursor-not-allowed ${
              !isPresent ? "opacity-40" : "opacity-90"
            }`}
            disabled={!isPresent}
          >
            <Delete id={member.userId} name={member.name} type={"user"} />
          </button>
        </div>
      );
    },
  },
];
