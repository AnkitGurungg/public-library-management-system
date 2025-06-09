import { useState } from "react";
import { UserRoundX, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import VmNonVMMembers from "@/features/LibrarianAndAdmin/Members/VmNonVMMembers";
import NonVerifiedMembers from "@/features/LibrarianAndAdmin/Members/NonVerifiedMembers";

const Members = () => {
  const [showVM, setVMShow] = useState(false);
  const [showNONVM, setNONVmShow] = useState(true);

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setVMShow(false);
              setNONVmShow(true);
            }}
          >
            <UserRoundX />
            Non-Verified Members
          </Button>

          <Button
            onClick={() => {
              setVMShow(true);
              setNONVmShow(false);
            }}
            className="bg-white text-black hover:bg-white"
          >
            <Users className="bg-white border-black" />
            Members
          </Button>
        </div>
      </div>

      {showNONVM && <NonVerifiedMembers />}
      {showVM && <VmNonVMMembers />}
    </div>
  );
};

export default Members;
