import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import { CheckCircle, ChevronsUpDown, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export const columns = (refetchMemberFines) => [
  {
    accessorKey: "imageURL",
    header: "Book",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageURL");
      const fullImageUrl = imageUrl
        ? `${BACKEND_SERVER_BASE_URL}/${imageUrl}`
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
    accessorKey: "title",
    header: "Title",
  },

  {
    id: "categoryName",
    header: "Category",
    accessorFn: (row) => row?.categoryName || "N/A",
    cell: ({ row }) => row?.original?.categoryName || "N/A",
  },

  {
    id: "borrowDate",
    cell: ({ row }) => row?.original?.borrowDate || "N/A",
    accessorFn: (row) => row?.borrowDate || "",
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
    id: "dueDate",
    cell: ({ row }) => row?.original?.dueDate || "N/A",
    accessorFn: (row) => row?.dueDate || "N/A",
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
    id: "returnDate",
    cell: ({ row }) => row?.original?.returnDate || "N/A",
    accessorFn: (row) => row?.returnDate || "N/A",
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
    id: "extended",
    accessorFn: (row) => String(row?.extended) || "",
    header: "Extended",
    cell: ({ row }) =>
      row?.original?.extended ? (
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
    accessorKey: "totalFine",
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
    id: "paidStatus",
    accessorFn: (row) => String(row?.paidStatus) || "",
    header: "Paid",
    cell: ({ row }) =>
      row?.original?.paidStatus ? (
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
      const isPaid = row.getValue("paidStatus");
      const paymentHandler = async (currBookFine) => {
        // some cleanup
        // console.log(currBookFine);

        const paymentData = {
          totalAmount: currBookFine.totalFine,
          fineId: currBookFine.fineId,
          borrowedBookName: currBookFine.title,
          // userId: "user-id",
          bookId: currBookFine.bookId,
        };

        try {
          const response = await GLOBAL_SERVICE.post(
            "/api/v1/mla/payments/khalti/initiate",
            paymentData,
          );
          // console.log("InitiateKhalti: ", response);

          const url = response?.data?.payment_url;
          if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              "Payment initiation failed! Please try again later.",
          );
          // console.error("FailedInitiatePayment!", error);
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
