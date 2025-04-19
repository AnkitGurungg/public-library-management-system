import { useEffect } from "react";
import { columns } from "@/components/table/Admin/reports/MemberUnpaidFines/columns";
import { DataTable } from "@/components/table/Admin/reports/MemberUnpaidFines/data-table";
import { useFetchMostBorrowingMembers } from "@/hooks/Report/useFetchMostBorrowingMembers";
import { useFetchMemberUnpaidFines } from "@/hooks/Report/useFetchMemberUnpaidFines";

const MemberUnpaidFines = () => {
  const { data: memberUnpaidFines, refetch: refetchMemberUnpaidFines } =
    useFetchMemberUnpaidFines();

  useEffect(() => {
    refetchMemberUnpaidFines();
  }, []);

  useEffect(() => {
    console.log(memberUnpaidFines);
  }, [memberUnpaidFines]);

  return (
    <section className="bg-gray-100 min-h-screen">
      {memberUnpaidFines?.data && (
        <div>
          <DataTable columns={columns} data={memberUnpaidFines?.data} />
        </div>
      )}
    </section>
  );
};

export default MemberUnpaidFines;
