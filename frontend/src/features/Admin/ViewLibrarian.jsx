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
import { useState } from "react";
import { Eye, Users } from "lucide-react";
import { useFetchUserById } from "@/hooks/useFetchUserById";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";

const ViewLibrarian = ({ id, type }) => {
  const [open, setOpen] = useState(false);
  const { data: librarian, error } = useFetchUserById(id, open);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Eye size={20} />
        </DialogTrigger>

        <DialogContent className="" aria-describedby={undefined}>
          <DialogHeader className="sm:max-w-[500px]">
            <DialogTitle className="text-2xl font-semibold flex items-center mb-0 mx-6">
              <div className="flex flex-row items-center h-11 w-11 justify-center bg-[#d7d7d7] rounded-md mr-3">
                <Users size={27} />
              </div>
              <span className="text-lg">View Librarian</span>
            </DialogTitle>
            <div className="my-0 h-px bg-gray-800 mx-4" />
          </DialogHeader>

          {librarian ? (
            <div className="max-h-[70vh] overflow-y-auto border border-gray-300 rounded-lg">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-24 w-24 mt-1">
                  {librarian?.evidence?.userImage ? (
                    <a
                      href={`${BACKEND_SERVER_BASE_URL}/${librarian?.evidence?.userImage}`}
                      target="_blank"
                    >
                      <AvatarImage
                        src={`${BACKEND_SERVER_BASE_URL}/${librarian?.evidence?.userImage}`}
                        alt="Librarian"
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
                  {librarian?.name || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Contact:</span>{" "}
                  {librarian?.contactNumber || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {librarian?.email || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {librarian?.address || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Applied Date:</span>{" "}
                  {librarian?.appliedDate || "N/A"}
                </div>

                <div className="">
                  <span className="font-semibold">Verified Date:</span>{" "}
                  {librarian?.verifiedDate || "N/A"}
                </div>
              </div>

              <div className="mt-6 space-y-4 mx-4 mb-2">
                <h3 className="font-bold mb-0 ml-0.5">Attached Images</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 overflow-hidden rounded-lg border">
                    <a
                      href={`${BACKEND_SERVER_BASE_URL}/${librarian?.evidence?.evidenceOne}`}
                      target="_blank"
                    >
                      <img
                        src={`${BACKEND_SERVER_BASE_URL}/${librarian?.evidence?.evidenceOne || ""}`}
                        alt="N/A"
                        className={`h-auto w-full object-cover min-h-20`}
                      />
                    </a>
                  </div>
                  <div className="flex-1 overflow-hidden rounded-lg border">
                    <a
                      href={`${BACKEND_SERVER_BASE_URL}/${librarian?.evidence?.evidenceTwo}`}
                      target="_blank"
                    >
                      <img
                        src={`${BACKEND_SERVER_BASE_URL}/${librarian?.evidence?.evidenceTwo || ""}`}
                        alt="N/A"
                        className={`h-auto w-full object-cover min-h-20`}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            error && (
              <p className="flex items-center justify-center h-40 text-red-500">
                Error loading user: {error?.message || "Something went wrong"}
              </p>
            )
          )}
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

export default ViewLibrarian;
