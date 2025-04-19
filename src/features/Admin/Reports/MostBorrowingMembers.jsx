import { columns } from "@/components/table/Admin/reports/MostBorrowingMembers/columns";
import { DataTable } from "@/components/table/Admin/reports/MostBorrowingMembers/data-table";
import { useFetchMostBorrowingMembers } from "@/hooks/Report/useFetchMostBorrowingMembers";
import { useEffect } from "react";

const MostBorrowingMembers = () => {
  const { data: mostBorrowingMembers, refetch: refetchMostBorrowingMembers } =
    useFetchMostBorrowingMembers();

  useEffect(() => {
    refetchMostBorrowingMembers();
  }, []);

  useEffect(() => {
    console.log(mostBorrowingMembers);
  }, [mostBorrowingMembers]);

  return (
    <section className="bg-gray-100 min-h-screen">
      {mostBorrowingMembers?.data && (
        <div>
          <DataTable columns={columns} data={mostBorrowingMembers?.data} />
        </div>
      )}
    </section>
  );
};

export default MostBorrowingMembers;
