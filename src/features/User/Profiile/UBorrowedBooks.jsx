import { useFetchMemberBorrowedBooks } from "@/hooks/useFetchMemberBorrowedBooks";
import UBorrowedBooksCard from "./UBorrowedBooksCard";
import { useEffect } from "react";
import { DataTable } from "@/components/table/UserProfile/BorrowedBooks/data-table";
import { columns } from "@/components/table/UserProfile/BorrowedBooks/columns";

const UBorrowedBooks = () => {
  const {
    data: memberBorrowedBooks,
    refetch: refetchMemberBorrowedBooks,
    isLoading,
  } = useFetchMemberBorrowedBooks();

  useEffect(() => {
    refetchMemberBorrowedBooks();
  }, []);

  console.log(memberBorrowedBooks);

  return (
    // <section className="bg-red-500 ml-64">
    //   <div className="flex flex-col">
    //     <div>
    //       {memberBorrowedBooks?.status === 200 &&
    //         Array.isArray(memberBorrowedBooks?.data) && (
    //           <h1 className="text-2xl text-black m-6 font-bold">
    //             Borrowed Books ({memberBorrowedBooks?.data?.length})
    //           </h1>
    //         )}
    //     </div>
    //     {memberBorrowedBooks?.status === 200 &&
    //       Array.isArray(memberBorrowedBooks?.data) &&
    //       memberBorrowedBooks?.data.map((currBorrowedBook) => (
    //         <UBorrowedBooksCard
    //           key={currBorrowedBook.getBorrowId}
    //           currBorrowedBook={currBorrowedBook}
    //         />
    //       ))}

    //     {memberBorrowedBooks?.data?.length === 0 && (
    //       <div className="text-center py-12">
    //         <p className="text-muted-foreground">
    //           You have not borrowed any books yet
    //         </p>
    //       </div>
    //     )}
    //   </div>
    // </section>

    <div className="ml-64 p-3">
      <div className="flex items-center pt-3 justify-between text-2xl text-[#206ea6]">
        <div className="px-2">
          <h1 className="text-2xl font-bold text-[#206ea6] mb-6 pb-2 border-b-2 border-[#206ea6] inline-block">
            Borrowed Books ({memberBorrowedBooks?.data?.length || "0"})
          </h1>
        </div>
      </div>
      <div>
        {memberBorrowedBooks && memberBorrowedBooks?.status === 200 && (
          <DataTable columns={columns} data={memberBorrowedBooks?.data} />
        )}
      </div>
    </div>
  );
};

export default UBorrowedBooks;
