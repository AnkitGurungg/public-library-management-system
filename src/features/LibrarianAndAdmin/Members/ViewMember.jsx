import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import { NotepadText } from "lucide-react";

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

  const checkUserType = () => {
    if (type === "vm") {
      return verifiedMember;
    }
    if (type === "nonvm") {
      return nonVerifiedMember;
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <NotepadText />
        </DialogTrigger>

        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>View Member</DialogTitle>
          </DialogHeader>
          <hr />
          {checkUserType() != null && checkUserType() != undefined ? (
            <div className="flex flex-row w-[vh]">
              <div className="flex flex-col gap-2">
                <div>
                  <p>Name: {checkUserType().name}</p>
                </div>
                <div>
                  <p>Contact: {checkUserType().contactNumber}</p>
                </div>
                <div>
                  <p>Email: {checkUserType().email}</p>
                </div>
                <div>
                  <p>Address: {checkUserType().address}</p>
                </div>
                <div className="flex flex-row justify-between">
                  <div>
                    <p>Applied Date: {checkUserType().appliedDate}</p>
                  </div>
                  <div>
                    <p>Verified Date: {checkUserType().verifiedDate}</p>
                  </div>
                </div>
              </div>

              {checkUserType()?.evidences?.length > 2 && (
                <div>
                  <div>
                    <a
                      href={BACKEND_SERVER_BASE_URL + checkUserType().evidences[0]?.userImage}
                      target="_blank"
                    >
                      <img
                        src={
                          BACKEND_SERVER_BASE_URL + checkUserType().evidences[0]?.userImage
                        }
                        alt="User Image Loading!!!"
                      />
                    </a>
                  </div>

                  <div>
                    <div>
                      <a
                        href={
                          BACKEND_SERVER_BASE_URL + checkUserType().evidences[0]?.evidenceOne
                        }
                        target="_blank"
                      >
                        <img
                          src={
                            BACKEND_SERVER_BASE_URL +
                            checkUserType().evidences[0]?.evidenceOne
                          }
                          alt="Evidence1 Loading!!!"
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href={
                          BACKEND_SERVER_BASE_URL + checkUserType().evidences[0]?.evidenceTwo
                        }
                        target="_blank"
                      >
                        <img
                          src={
                            BACKEND_SERVER_BASE_URL +
                            checkUserType().evidences[0]?.evidenceTwo
                          }
                          alt="Evidence2 Loading!!!"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Does not exist</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewMember;
