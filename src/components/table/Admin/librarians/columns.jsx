import Delete from "@/components/Delete";
import UpdateLibrarian from "@/features/Admin/UpdateLibrarian";
import ViewLibrarian from "@/features/Admin/ViewLibrarian";

export const columns = [
  {
    accessorKey: "userId",
    header: "ID",
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
    header: "Action",
    cell: ({ row }) => {
      const librarian = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <ViewLibrarian id={librarian.userId} />
          <UpdateLibrarian id={librarian.userId} />
          <Delete
            id={librarian.userId}
            name={librarian?.name}
            type={"user"}
          />
        </div>
      );
    },
  },
];
