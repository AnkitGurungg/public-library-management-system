import { CircleX } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VerifiedMembers from "@/features/LibrarianAndAdmin/Members/VerifiedMembers";
import NonVerifiedMembers from "@/features/LibrarianAndAdmin/Members/NonVerifiedMembers";
import { useState, useEffect } from "react";

const Members = () => {
  const [showVM, setVMShow] = useState(false);
  const [showNONVM, setNONVmShow] = useState(true);

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <Button
          onClick={() => {
            setVMShow(false);
            setNONVmShow(true);
          }}
        >
          <CircleX />
          Non-Verified Members
        </Button>

        <Button
          onClick={() => {
            setVMShow(true);
            setNONVmShow(false);
          }}
          className="bg-white text-black hover:bg-white"
        >
          <CircleCheck className="bg-white border-black" />
          Verified Members
        </Button>

        <Input
          type="number"
          placeholder="Search here"
          className="bg-white w-[240px]"
        />
      </div>

      {showNONVM && <NonVerifiedMembers />}
      {showVM && <VerifiedMembers />}
    </div>
  );
};

export default Members;
