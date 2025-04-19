import Delete from "@/components/Delete";
import UpdateBook from "@/features/LibrarianAndAdmin/Books/UpdateBook";
import ViewBook from "@/features/LibrarianAndAdmin/Books/ViewBook";

export const columns = [
  {
    accessorKey: "bookId",
    header: "ID",
  },

  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "author",
    header: "Author",
  },

  {
    id: "category",
    header: "Category",
    accessorFn: (row) => row?.category?.name || "",
    cell: ({ row }) => row.original.category?.name || "",
  },

  {
    accessorKey: "publishedDate",
    header: "Published Date",
  },

  {
    accessorKey: "language",
    header: "Language",
  },

  {
    accessorKey: "edition",
    header: "Edition",
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    header: "Action",
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <ViewBook id={book.bookId} />
          <UpdateBook id={book.bookId} />
          <Delete id={book.bookId} name={book.title} type={"book"} />
        </div>
      );
    },
  },
];
