import { columns } from "@/components/table/UserProfile/Fines/columns";
import { DataTable } from "@/components/table/UserProfile/Fines/data-table";
import { useFetchMemberFines } from "@/hooks/useFetchMemberFines";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import toast from "react-hot-toast";

const MemberFines = () => {
  const {
    data: memberFines,
    refetch: refetchMemberFines,
    isLoading,
  } = useFetchMemberFines();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refetchMemberFines();
  }, []);

  useEffect(() => {
    console.log(memberFines);
  }, [memberFines]);

  const paymentHandler = async (currBookFine) => {
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
      const url = response?.data?.payment_url;
      return useCallback((url, newTab = true) => {
        if (newTab) {
          window.open(url, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = url;
        }
      }, []);
      // refetchMemberFines();
      // alert("Payment successful");
    } catch (error) {}
  };

  const handlePayment = async (currBookFine) => {
    setLoading(true);
    const paymentData = {
      totalAmount: currBookFine.getTotalFine,
      fineId: currBookFine.getFineId,
      borrowedBookName: currBookFine.getTitle,
      // userId: "user-id",
      bookId: currBookFine.getBookId,
    };

    console.log(paymentData);

    try {
      // const response = await GLOBAL_SERVICE.post(
      //   "/api/v1/m/user/profile/fine/pay",
      //   paymentData
      // );

      // const url = response?.data?.payment_url;
      // console.log(url);
      // if (url) {
      //   window.open(url, "_blank", "noopener,noreferrer");
      // }

      refetchMemberFines();
      toast.success("Payment successful");
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <section className="bg-green-500 ml-64">
    //   <div>
    //     <div>
    //       {memberFines?.status === 200 && Array.isArray(memberFines?.data) && (
    //         <h1 className="text-2xl text-black m-6 font-bold">
    //           Fines ({memberFines?.data?.length})
    //         </h1>
    //       )}
    //     </div>
    //     <div>
    //       {memberFines?.status === 200 &&
    //         Array.isArray(memberFines?.data) &&
    //         memberFines?.data?.length > 0 &&
    //         memberFines.data.map((currFine) => (
    //           <div key={currFine.getFineId} className="m-6">
    //             <p>{currFine.getFineId}</p>
    //             <p>{currFine.getTitle}</p>
    //             <p>{currFine.getAuthor}</p>
    //             <p>{currFine.getLanguage}</p>
    //             <p>{currFine.getEdition}</p>
    //             <p>{currFine.getImageURL}</p>
    //             <p>{currFine.getCategoryName}</p>

    //             <p>{currFine.isReturnStatus}</p>
    //             <p>{currFine.getBorrowDate}</p>
    //             <p>{currFine.getDueDate}</p>
    //             <p>{currFine.isExtended}</p>

    //             <p>{currFine.getReturnDate}</p>
    //             <p>{currFine.getTotalFine}</p>
    //             <p>{currFine.isPaidStatus}</p>

    //             <p>{currFine.getAmount}</p>
    //             <p>{currFine.getDate}</p>

    //             <div className="relative group inline-block">
    //               <button
    //                 className={`px-4 py-2 rounded transition
    //                 ${
    //                   currFine.isPaidStatus
    //                     ? "bg-red-300 cursor-not-allowed"
    //                     : "bg-green-500 hover:bg-green-600 hover:cursor-pointer"
    //                 }`}
    //                 disabled={currFine.isPaidStatus}
    //                 onClick={() => {
    //                   if (!currFine.isPaidStatus) {
    //                     // paymentHandler(currFine);
    //                     handlePayment(currFine);
    //                   }
    //                 }}
    //               >
    //                 Pay
    //               </button>
    //               <span
    //                 className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition
    //               bg-gray-800 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap z-10"
    //               >
    //                 {currFine.isPaidStatus ? "Already Paid" : "Pay now"}
    //               </span>
    //             </div>
    //           </div>
    //         ))}
    //     </div>
    //   </div>
    // </section>

    <div className="ml-64">
      {memberFines && memberFines?.status === 200 && (
        <DataTable
          columns={columns(refetchMemberFines)}
          data={memberFines?.data}
        />
      )}
    </div>
  );
};

export default MemberFines;
