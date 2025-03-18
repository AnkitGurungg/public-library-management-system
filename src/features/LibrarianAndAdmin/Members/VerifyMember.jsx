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
import GlobalService from "@/services/GlobalServices";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";

const VerifyMember = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();
  const { data: VerifiedMembers, refetch: refetchVerifiedMembers } =
    useFetchVerifiedMembers();

  const handleVerification = async () => {
    try {
      const response = await GlobalService.put(`/api/user/verify/${id}`);
      refetchNonVerifiedMembers();
      refetchVerifiedMembers();
      setOpen(false);
      console.log(response);

    } catch (error) {
      alert(response);
      console.log(response);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Check />
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