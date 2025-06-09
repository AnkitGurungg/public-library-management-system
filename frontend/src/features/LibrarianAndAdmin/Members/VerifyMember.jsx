import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CircleCheckBig, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import toast from "react-hot-toast";

const VerifyMember = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { refetch: refetchNonVerifiedMembers } = useFetchNonVerifiedMembers();
  const { refetch: refetchVerifiedMembers } = useFetchVerifiedMembers();

  const handleVerification = async () => {
    try {
      const response = await GLOBAL_SERVICE.put(
        `/api/v1/la/users/verify/${id}`
      );
      toast.success("Member verified.");
      refetchNonVerifiedMembers();
      refetchVerifiedMembers();
      setOpen(false);
    } catch (error) {
      toast.error("Error verifying member.");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <CircleCheckBig size={18} />
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <Users size={27} />
              </div>
              <span className="text-lg">Verify Member</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-5" />
          </DialogHeader>
          <p className="mx-5">
            Are you sure want to procceed with the verification of user in id:{" "}
            {id}
          </p>
          <DialogFooter className="w-full">
            <Button onClick={handleVerification} className="w-full">
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifyMember;
