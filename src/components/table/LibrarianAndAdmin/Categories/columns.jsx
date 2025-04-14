import Delete from "@/components/Delete";
import UpdateCategory from "@/features/LibrarianAndAdmin/Categories/UpdateCategory";
import ViewCategory from "@/features/LibrarianAndAdmin/Categories/ViewCategory";

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
    header: "Starting Number",
  },

  {
    accessorKey: "endingNumber",
    header: "Ending Number",
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
