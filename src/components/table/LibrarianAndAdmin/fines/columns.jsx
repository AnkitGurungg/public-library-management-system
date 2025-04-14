import Delete from "@/components/Delete";
import UpdateBook from "@/features/LibrarianAndAdmin/Books/UpdateBook";
import ViewBook from "@/features/LibrarianAndAdmin/Books/ViewBook";

export const columns = [
  {
    header: "ID",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowUsers?.userId || "N/A",
  },

  {
    id: "userName",
    header: "Name",
    accessorFn: (row) => row?.returns?.borrows?.borrowUsers?.name ?? "",
    cell: ({ getValue }) => getValue() || "N/A",
    filterFn: "includesString",
  },

  {
    header: "Title",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowBooks?.title || "N/A",
  },

  {
    header: "Category",
    cell: ({ row }) =>
      row?.original?.returns?.borrows?.borrowBooks?.category?.name || "N/A",
  },

  {
    header: "Borrow Date",
    cell: ({ row }) => row?.original?.returns?.borrows?.borrowDate || "N/A",
  },

  {
    header: "Due Date",
    cell: ({ row }) => row?.original?.returns?.returnDate || "N/A",
  },

  {
    header: "Amount",
    cell: ({ row }) => row?.original?.totalFine || "N/A",
  },

  {
    header: "Returned Date",
    cell: ({ row }) => row?.original?.returns?.borrows?.dueDate || "N/A",
  },

  {
    header: "Status",
    cell: ({ row }) => (row?.original?.paidStatus ? "Yes" : "No" || "N/A"),
  },
];
