import { Button } from "../ui/button";
import { useState } from "react";
import NonVerifiedMembers from "./NonVerifiedMembers";
import VerifiedMembers from "./VerifiedMembers";
import { Input } from "../ui/input";
import { CircleCheck } from "lucide-react";
import { CircleX } from "lucide-react";

const Members = () => {
  const [showVM, setVMShow] = useState(false);
  const [showNONVM, setNONVmShow] = useState(true);

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-xl">Member Management</h1>
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
        >
          <CircleCheck className="bg-black border-white"/>
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
