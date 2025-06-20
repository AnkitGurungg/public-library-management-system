import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export const columns = (refetchMemberFines) => [
  
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
    id: "getCategoryName",
    header: "Category",
    accessorFn: (row) => row?.getCategoryName || "N/A",
    cell: ({ row }) => row?.original?.getCategoryName || "N/A",
  },

  {
    id: "getBorrowDate",
    cell: ({ row }) => row?.original?.getBorrowDate || "N/A",
    accessorFn: (row) => row?.getBorrowDate || "",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Borrowed Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "getDueDate",
    cell: ({ row }) => row?.original?.getDueDate || "N/A",
    accessorFn: (row) => row?.getDueDate || "N/A",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "getReturnDate",
    cell: ({ row }) => row?.original?.getReturnDate || "N/A",
    accessorFn: (row) => row?.getReturnDate || "N/A",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Returned Date
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "isExtended",
    accessorFn: (row) => String(row?.isExtended) || "",
    header: "Extended",
    cell: ({ row }) =>
      row?.original?.isExtended ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-white bg-[#206ea6] rounded-md">
          <CheckCircle size={16} className="text-white" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-white bg-red-600 opacity-80 rounded-md">
          <XCircle size={16} className="text-white" />
          NO
        </span>
      ),
  },

  {
    accessorKey: "getTotalFine",
    header: ({ column }) => {
      return (
        <div className="flex justify-center w-full text-center">
          <span
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </span>
        </div>
      );
    },
  },

  {
    id: "isPaidStatus",
    accessorFn: (row) => String(row?.isPaidStatus) || "",
    header: "Paid",
    cell: ({ row }) =>
      row?.original?.isPaidStatus ? (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-white bg-[#206ea6] rounded-md">
          <CheckCircle size={16} className="text-white" />
          YES
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-white bg-red-600 opacity-80 rounded-md">
          <XCircle size={16} className="text-white" />
          NO
        </span>
      ),
  },

  {
    accessorKey: "paymentAction",
    header: "Action",
    cell: ({ row }) => {
      const isPaid = row.getValue("isPaidStatus");
      const paymentHandler = async (currBookFine) => {
        // console.log(currBookFine);

        const paymentData = {
          totalAmount: currBookFine.getTotalFine,
          fineId: currBookFine.getFineId,
          borrowedBookName: currBookFine.getTitle,
          // userId: "user-id",
          bookId: currBookFine.getBookId,
        };

        try {
          const response = await GLOBAL_SERVICE.post(
            "/api/v1/mla/payments/khalti/initiate",
            paymentData
          );
          // console.log("Initiate Khalti: ", response);

          const url = response?.data?.payment_url;
          if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        } catch (error) {
          toast.error("Payment failed!");
          console.error("Payment failed!", error);
        }
      };

      if (isPaid === "true" || isPaid === true) {
        return (
          <button
            disabled
            className="rounded-md text-white bg-[#1b5c8c] opacity-60 hover:text-white hover:bg-[#206ea6] px-3 py-0.5 text-sm cursor-not-allowed w-14 uppercase"
          >
            Paid
          </button>
        );
      } else
        return (
          <div>
            <button
              className="hover:cursor-pointer px-3 py-0.5 text-sm text-white bg-red-600 opacity-80 hover:bg-red-400 hover:text-white rounded-md w-14 uppercase"
              onClick={() => paymentHandler(row.original)}
            >
              Pay
            </button>
          </div>
        );
    },
  },
];
