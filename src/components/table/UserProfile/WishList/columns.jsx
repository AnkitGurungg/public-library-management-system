import { Button } from "@/components/ui/button";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import toast from "react-hot-toast";

export const columns = (refetchMemberWishList) => [
  {
    accessorKey: "imageURL",
    header: "Book",
    cell: ({ row }) => {
      const imageUrl = row.original.book.imageURL;
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
    cell: ({ row }) => row.original.book?.title || "N/A",
    accessorFn: (row) => row.book?.title || "N/A",
  },

  // {
  //   header: "Category",
  //   cell: ({ row }) => row.original.category?.name || "N/A",
  // },

  {
    id: "category",
    header: "Category",
    accessorFn: (row) => row?.book?.category?.name || "",
    cell: ({ row }) => row?.original?.book?.category?.name || "N/A",
  },

  // {
  //   header: "Language",
  //   cell: ({ row }) => row.original.book?.language || "N/A",
  // },

  {
    id: "language",
    header: "Language",
    accessorFn: (row) => row?.book?.language || "",
    cell: ({ row }) => row.original.book?.language || "N/A",
  },

  {
    header: "Author",
    cell: ({ row }) => row.original.book?.author || "N/A",
  },

  {
    header: "Edition",
    cell: ({ row }) => row.original.book?.edition || "N/A",
  },

  {
    header: "Published Date",
    cell: ({ row }) => row.original.book?.publishedDate || "N/A",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const eachBook = row.original;
      const removeHandler = async () => {
        try {
          const response = await GLOBAL_SERVICE.delete(
            `/api/v1/m/wishlist/delete/${eachBook.wishListId}`
          );
          if (response.status === 200) {
            refetchMemberWishList();
            toast.success(`${eachBook?.book?.title} has been removed!`);
          }
        } catch (error) {
          console.log(error);
          alert("Could not delete the book");
        }
      };

      return (
        <button
          onClick={removeHandler}
          // variant="destructive"
          // className="h-5 px-2 text-[10px] pointer-events-none cursor-default"
          className="px-3 py-0.5 text-sm border border-red-500 rounded text-red-500 hover:text-white hover:bg-red-500"
        >
          Remove
        </button>
      );
    },
  },
];
