import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import { BookOpenText, Eye, NotepadText, Users, X } from "lucide-react";

const ViewMember = ({ id, type }) => {
  const BACKEND_SERVER_BASE_URL = "http://localhost:8080/";
  const { data: verifiedMembers, refetch: refetchVerifiedMembers } =
    useFetchVerifiedMembers();
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();

  const verifiedMember =
    Array.isArray(verifiedMembers?.data) &&
    verifiedMembers?.data?.length > 0 &&
    verifiedMembers?.data?.find((element) => element.userId === id);
  const nonVerifiedMember =
    Array.isArray(nonVerifiedMembers?.data) &&
    nonVerifiedMembers?.data?.length > 0 &&
    nonVerifiedMembers?.data?.find((element) => element.userId === id);

  const selectedMember = type === "vm" ? verifiedMember : nonVerifiedMember;
  console.log(selectedMember);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Eye size={20} />
        </DialogTrigger>

        <DialogContent className="" aria-describedby={undefined}>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <Users size={27} />
              </div>
              <span className="text-lg">View Member</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-4" />
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto border border-gray-300 rounded-lg">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-24 w-24 mt-1">
                {selectedMember?.evidence?.userImage ? (
                  <a
                    href={
                      BACKEND_SERVER_BASE_URL +
                      selectedMember.evidence?.userImage
                    }
                    target="_blank"
                  >
                    <AvatarImage
                      src={`${BACKEND_SERVER_BASE_URL}${selectedMember.evidence?.userImage}`}
                      alt="Member"
                      className="object-cover"
                    />
                  </a>
                ) : (
                  <AvatarFallback>N/A</AvatarFallback>
                )}
              </Avatar>
            </div>

            <div className="space-y-3 text-base mx-5">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {selectedMember?.name || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Contact:</span>{" "}
                {selectedMember?.contactNumber || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {selectedMember?.email || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {selectedMember?.address || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Applied Date:</span>{" "}
                {selectedMember?.appliedDate || "N/A"}
              </div>

              <div className="">
                <span className="font-semibold">Verified Date:</span>{" "}
                {selectedMember?.verifiedDate || "N/A"}
              </div>
            </div>

            <div className="mt-6 space-y-4 mx-4 mb-2">
              <h3 className="font-bold mb-0 ml-0.5">Attached Images</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 overflow-hidden rounded-lg border">
                  <a
                    href={
                      BACKEND_SERVER_BASE_URL +
                      selectedMember.evidence?.evidenceOne
                    }
                    target="_blank"
                    onClick={(e) => {
                      if (!selectedMember.evidence?.evidenceOne) {
                        e.preventDefault();
                      }
                    }}
                    className={`${
                      selectedMember.evidence?.evidenceOne ? "" : "cursor-text"
                    }`}
                  >
                    <img
                      src={
                        selectedMember?.evidence?.evidenceOne
                          ? `${BACKEND_SERVER_BASE_URL}${selectedMember.evidence?.evidenceOne}`
                          : ""
                      }
                      alt="N/A"
                      className={`h-auto w-full object-cover min-h-20`}
                    />
                  </a>
                </div>
                <div className="flex-1 overflow-hidden rounded-lg border">
                  <a
                    href={
                      BACKEND_SERVER_BASE_URL +
                      selectedMember.evidence?.evidenceTwo
                    }
                    target="_blank"
                    onClick={(e) => {
                      if (!selectedMember.evidence?.evidenceTwo) {
                        e.preventDefault();
                      }
                    }}
                    className={`${
                      selectedMember.evidence?.evidenceTwo ? "" : "cursor-text"
                    }`}
                  >
                    <img
                      src={
                        selectedMember?.evidence?.evidenceTwo
                          ? `${BACKEND_SERVER_BASE_URL}${selectedMember.evidence?.evidenceTwo}`
                          : ""
                      }
                      alt="N/A"
                      className={`h-auto w-full object-cover min-h-20`}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose className="w-full">
              <Button className="w-full">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewMember;
