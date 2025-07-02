import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export const columns = (refetchMemberWishList) => [
  {
    accessorKey: "imageURL",
    header: "Book",
    cell: ({ row }) => {
      const imageUrl = row.original.imageURL;
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
    id: "title",
    header: "Title",
    accessorFn: (row) => {
      // console.log(row);
      return row?.title || "N/A"
    },
    cell: ({ row }) => {
      // console.log(row)
      return row.original?.title || "N/A"
    },
  },

  {
    header: "Author",
    cell: ({ row }) => row.original.author || "N/A",
  },

  {
    id: "category",
    header: "Category",
    accessorFn: (row) => row?.categoryName || "N/A",
    cell: ({ row }) => row?.original?.categoryName || "N/A",
  },

  {
    id: "language",
    header: "Language",
    accessorFn: (row) => row?.language || "N/A",
    cell: ({ row }) => row.original.language || "N/A",
  },

  {
    header: "Published Date",
    cell: ({ row }) => row.original?.publishedDate || "N/A",
  },

  {
    id: "inStock",
    accessorFn: (row) => ((row?.availableQuantity ?? 0) > 0 ? "YES" : "NO"),
    header: "Stock Status",
    cell: ({ row }) => {
      const quantity = row.original.availableQuantity || 0;
      return quantity > 0 ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-[#206ea6] text-white rounded-md">
          <CheckCircle size={16} className="text-white" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-red-600 opacity-80 text-white rounded-md">
          <XCircle size={16} className="text-white" />
          NO
        </span>
      );
    },
  },

  {
    id: "shelf",
    header: "Shelf",
    accessorFn: (row) => row?.shelfName || "N/A",
    cell: ({ row }) => row?.original?.shelfName || "N/A",
  },

  {
    header: "Action",
    cell: ({ row }) => {
      const eachBook = row.original;
      const removeHandler = async () => {
        try {
          const response = await GLOBAL_SERVICE.delete(
            `/api/v1/m/wishlists/${eachBook.wishListId}`
          );
          if (response.status === 200) {
            refetchMemberWishList();
            toast.success(`Removed ${eachBook?.title}!`);
          }
        } catch (error) {
          console.log(error);
          alert("Could not delete the book");
        }
      };

      return (
        <button
          onClick={removeHandler}
          className="px-2 py-0.5 text-sm rounded-md bg-red-600 opacity-80 text-white hover:text-white hover:bg-red-400 uppercase cursor-pointer"
        >
          Remove
        </button>
      );
    },
  },
];