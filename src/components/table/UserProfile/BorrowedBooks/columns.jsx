import { Button } from "@/components/ui/button";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";

export const columns = [
  {
    accessorKey: "getImageURL",
    header: "Book",
    cell: ({ row }) => {
      const imageUrl = row.getValue("getImageURL");
      const fullImageUrl = imageUrl
        ? `${BACKEND_SERVER_BASE_URL}${imageUrl}`
        : null;
      return fullImageUrl ? (
        <img
          src={fullImageUrl}
          alt="Book"
          className="h-12 w-10 object-cover rounded-md"
        />
      ) : (
        <span>No Image</span>
      );
    },
  },

  {
    accessorKey: "getTitle",
    header: "Title",
  },

  {
    accessorKey: "getCategoryName",
    header: "Category",
  },

  {
    accessorKey: "getLanguage",
    header: "Language",
  },

  {
    accessorKey: "getBorrowDate",
    header: "Borrow Date",
  },

  {
    accessorKey: "getDueDate",
    header: "Due Date",
  },
  {
    accessorKey: "getReturnDate",
    header: "Returned Date",
    cell: ({ row }) => {
      const returnDate = row.getValue("getReturnDate");
      if (!returnDate) {
        return (
          <span className="bg-red-300 text-red-600 px-3 py-1.5 rounded-2xl text-[11px]">
            NOT RETURNED
          </span>
        );
      }
      return <span>{returnDate}</span>;
    },
  },
  {
    accessorKey: "isExtended",
    header: "Is Extended",
    cell: ({ row }) => {
      const isExtended = row.getValue("isExtended");
      return isExtended ? "YES" : "NO";
    },
  },
];
