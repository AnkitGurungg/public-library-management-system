import { useEffect } from "react";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import { columns } from "@/components/table/LibrarianAndAdmin/members/Members/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/members/Members/data-table";

const VNonVMembers = () => {
  const { data: verifiedMembers, refetch: refetchVerifiedMembers } =
    useFetchVerifiedMembers();

  useEffect(() => {
    refetchVerifiedMembers();
  }, []);

  useEffect(() => {
    // console.log(verifiedMembers);
  }, [verifiedMembers]);

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      {verifiedMembers?.data && (
        <div>
          <DataTable columns={columns} data={verifiedMembers?.data || []} />
        </div>
      )}
    </div>
  );
};

export default VNonVMembers;
