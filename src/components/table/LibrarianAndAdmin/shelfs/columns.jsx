import Delete from "@/components/Delete";
import UpdateBook from "@/features/LibrarianAndAdmin/Books/UpdateBook";
import ViewBook from "@/features/LibrarianAndAdmin/Books/ViewBook";
import UpdateShelf from "@/features/LibrarianAndAdmin/Shelf/UpdateShelf";
import ViewShelf from "@/features/LibrarianAndAdmin/Shelf/ViewShelf";

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
    header: "Added Date",
  },
  {
    accessorKey: "updatedDate",
    header: "Updated Date",
  },

  {
    accessorKey: "capacity",
    header: "Capacity",
  },

  {
    header: "Category",
    cell: ({ row }) => row.original.category?.name || "",
  },

  {
    header: "Action",
    cell: ({ row }) => {
      const shelf = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <ViewShelf id={shelf.shelfId} />
          <UpdateShelf id={shelf.shelfId} />
          <Delete id={shelf.shelfId} name={shelf.name} type={"shelf"} />
        </div>
      );
    },
  },
];
