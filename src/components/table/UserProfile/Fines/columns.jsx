import { Button } from "@/components/ui/button";
import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import { useState } from "react";
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
          <Button
            variant="destructive"
            className="h-5 px-2 text-[10px] pointer-events-none cursor-default"
          >
            NOT RETURNED
          </Button>
        );
      }
      return <span>{returnDate}</span>;
    },
  },
  {
    accessorKey: "isExtended",
    header: "Extended Due date",
    cell: ({ row }) => {
      const isExtended = row.getValue("isExtended");
      return isExtended ? "YES" : "NO";
    },
  },
  {
    accessorKey: "getTotalFine",
    header: "Amount",
  },
  {
    accessorKey: "isPaidStatus",
    header: "Status",
    cell: ({ row }) => {
      const isPaid = row.getValue("isPaidStatus");
      return isPaid ? "YES" : "NO";
    },
  },
  {
    accessorKey: "paymentAction",
    header: "Action",
    cell: ({ row }) => {
      const isPaid = row.getValue("isPaidStatus");
      const paymentHandler = async (currBookFine) => {
        console.log(currBookFine);
        const paymentData = {
          totalAmount: currBookFine.getTotalFine,
          fineId: currBookFine.getFineId,
          borrowedBookName: currBookFine.getTitle,
          // userId: "user-id",
          bookId: currBookFine.getBookId,
        };

        try {
          const response = await GLOBAL_SERVICE.post(
            "/api/v1/m/user/profile/fine/pay",
            paymentData
          );
          console.log(response);
          const url = response?.data?.payment_url;

          if (url) {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        } catch (error) {
          toast.error("Payment failed!");
          console.error("Payment failed!", error);
        }
      };

      if (isPaid) {
        return (
          <button
            disabled
            // onClick={paymentHandler}
            className="bg-white border border-[#206ea6] text-[#206ea6] opacity-50 px-3 py-0.5 text-sm rounded cursor-not-allowed"
          >
            Paid
          </button>
        );
      } else
        return (
          <div>
            <button
              className="hover:cursor-pointer px-3 py-0.5 text-sm border bg-red-500 text-white rounded"
              onClick={() => paymentHandler(row.original)}
            >
              Pay Now
            </button>
          </div>
        );
    },
  },
];
