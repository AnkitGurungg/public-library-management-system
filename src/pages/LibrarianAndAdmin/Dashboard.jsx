import { useEffect } from "react";
import useFetchCountVm from "@/hooks/Dashboard/useFetchCountVm";
import useFetchCountNonVm from "@/hooks/Dashboard/useFetchCountNonVm";
import useFetchCountBooks from "@/hooks/Dashboard/useFetchCountBooks";
import useFetchCountBorrowedBooks from "@/hooks/Dashboard/useFetchCountBorrowedBooks";
import { BookOpenText, BookText, UserCheck, UserRoundX } from "lucide-react";
// import CategoryStatsChart from "@/features/LibrarianAndAdmin/Dashboard/CategoryStatsChart";

const Dashboard = () => {
  const {
    data: countBooks,
    refetch: refetchCountBooks,
    isLoading: loadingCountBooks,
  } = useFetchCountBooks();

  const {
    data: countVm,
    refetch: refetchCountVm,
    isLoading: loadingCountVm,
  } = useFetchCountVm();

  const {
    data: countBorrowedBooks,
    refetch: refetchCountBorrowedBooks,
    isLoading: loadingCountBorrowedBooks,
  } = useFetchCountBorrowedBooks();

  const {
    data: countNonVm,
    refetch: refetchCountNonvm,
    isLoading: loadingCountNonVm,
  } = useFetchCountNonVm();

  useEffect(() => {
    refetchCountBooks();
    refetchCountVm();
    refetchCountNonvm();
  }, []);

  return (
    <section className="">
      <div className="flex flex-row items-center justify-center gap-5">
        <div className="flex flex-row items-center gap-1 w-[220px] h-[60px] rounded-xl bg-white">
          <div className="flex justify-center items-center">
            <UserRoundX className="" />
          </div>
          <div className="border-l-2 border-black self-stretch"></div>
          <div>
            <h1 className="">
              {countNonVm?.status === 200 &&
                countNonVm?.data?.length !== 0 &&
                countNonVm?.data}
            </h1>
            <h1>Members to Verify</h1>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1 bg-white w-[220px] h-[60px] rounded-xl">
          <div>
            <UserCheck className="" />
          </div>
          <div className="border-l-2 border-black self-stretch"></div>
          <div>
            <h1 className="">
              {countVm?.status === 200 &&
                countVm?.data?.length !== 0 &&
                countVm?.data}
            </h1>
            <h1>Verified members</h1>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1 bg-white w-[220px] h-[60px] rounded-xl">
          <div>
            <BookOpenText className="" />
          </div>
          <div className="border-l-2 border-black self-stretch"></div>
          <div>
            <h1 className="text-xl">
              {countBorrowedBooks?.status === 200 &&
                countBorrowedBooks?.data?.length !== 0 &&
                countBorrowedBooks?.data}
            </h1>
            <h1>Borrowed Books</h1>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1 bg-white w-[220px] h-[60px] rounded-xl">
          <div>
            <BookText className="" />
          </div>
          <div className="border-l-2 border-black self-stretch"></div>
          <div>
            <h1 className="">
              {countBooks?.status === 200 &&
                countBooks?.data?.length !== 0 &&
                countBooks?.data}
            </h1>
            <h1>Available Books</h1>
          </div>
        </div>
      </div>
      {/* <CategoryStatsChart /> */}
    </section>
  );
};

export default Dashboard;
