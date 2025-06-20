import { useEffect } from "react";
import { columns } from "@/components/table/UserProfile/Fines/columns";
import { DataTable } from "@/components/table/UserProfile/Fines/data-table";
import { useFetchMemberFines } from "@/hooks/useFetchMemberFines";

const MemberFines = () => {
  const {
    data: memberFines,
    refetch: refetchMemberFines,
    isLoading,
  } = useFetchMemberFines();

  useEffect(() => {
    refetchMemberFines();
  }, []);

  useEffect(() => {
    // console.log("Member Fines: ", memberFines);
  }, [memberFines]);

  return (
    <div className="ml-64 p-3">
      <div className="flex items-center pt-3 justify-between text-2xl text-[#206ea6]">
        <div className="px-2">
          <h1 className="text-2xl font-bold text-[#206ea6] mb-6 pb-2 border-b-2 border-[#206ea6] inline-block">
            Fines ({memberFines?.data?.length || "0"})
          </h1>
        </div>
      </div>
      <div>
        {memberFines?.data && (
          <DataTable
            columns={columns(refetchMemberFines)}
            data={memberFines?.data}
          />
        )}
      </div>
    </div>
  );
};

export default MemberFines;
