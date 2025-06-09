import { useEffect } from "react";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { columns } from "@/components/table/LibrarianAndAdmin/members/NonVerifiedMembers/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/members/NonVerifiedMembers/data-table";

const NonVerifiedMembers = () => {
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();

  useEffect(() => {
    refetchNonVerifiedMembers();
  }, []);

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      {nonVerifiedMembers?.data && (
        <div>
          <DataTable columns={columns} data={nonVerifiedMembers?.data || []} />
        </div>
      )}
    </div>
  );
};

export default NonVerifiedMembers;
