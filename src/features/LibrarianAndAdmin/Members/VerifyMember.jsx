import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const VerifyMember = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();
  const { data: VerifiedMembers, refetch: refetchVerifiedMembers } =
    useFetchVerifiedMembers();

  const handleVerification = async () => {
    try {
      const response = await GLOBAL_SERVICE.put(`/api/v1/la/user/verify/${id}`);
      refetchNonVerifiedMembers();
      refetchVerifiedMembers();
      setOpen(false);
    } catch (error) {
      alert(response);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Check size={20} />
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Verify Member</DialogTitle>
          </DialogHeader>
          <hr />
          <p>
            Are you sure want to procceed with the verification of user in id:{" "}
            {id}
          </p>
          <DialogFooter>
            <Button onClick={handleVerification}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifyMember;
