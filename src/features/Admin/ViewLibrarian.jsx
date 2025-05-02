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
import useFetchLibrarian from "@/hooks/useFetchLibrarian";
import { BookOpenText, Eye, NotepadText, Users, X } from "lucide-react";

const ViewLibrarian = ({ id, type }) => {
  const BACKEND_SERVER_BASE_URL = "http://localhost:8080/";

  const { data: librarians, refetch: refetchLibrarians } = useFetchLibrarian();

  const selectedLibrarian =
    Array.isArray(librarians?.data) &&
    librarians?.data?.length > 0 &&
    librarians?.data?.find((element) => element.userId === id);

  return (
    <div>
      <Dialog aria-describedby={undefined}>
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
          <div className="max-h-[70vh] overflow-y-auto border border-gray-300 rounded-lg">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-24 w-24 mt-1">
                {selectedLibrarian?.evidence?.userImage ? (
                  <a
                    href={
                      BACKEND_SERVER_BASE_URL +
                      selectedLibrarian.evidence?.userImage
                    }
                    target="_blank"
                  >
                    <AvatarImage
                      src={`${BACKEND_SERVER_BASE_URL}${selectedLibrarian.evidence?.userImage}`}
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
                {selectedLibrarian?.name || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Contact:</span>{" "}
                {selectedLibrarian?.contactNumber || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {selectedLibrarian?.email || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {selectedLibrarian?.address || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Applied Date:</span>{" "}
                {selectedLibrarian?.appliedDate || "N/A"}
              </div>

              <div className="">
                <span className="font-semibold">Verified Date:</span>{" "}
                {selectedLibrarian?.verifiedDate || "N/A"}
              </div>
            </div>

            <div className="mt-6 space-y-4 mx-4 mb-2">
              <h3 className="font-bold mb-0 ml-0.5">Attached Images</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 overflow-hidden rounded-lg border">
                  <a
                    href={
                      BACKEND_SERVER_BASE_URL +
                      selectedLibrarian.evidence?.evidenceOne
                    }
                    target="_blank"
                  >
                    <img
                      src={
                        selectedLibrarian?.evidence?.evidenceOne
                          ? `${BACKEND_SERVER_BASE_URL}${selectedLibrarian.evidence?.evidenceOne}`
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
                      selectedLibrarian.evidence?.evidenceTwo
                    }
                    target="_blank"
                  >
                    <img
                      src={
                        selectedLibrarian?.evidence?.evidenceTwo
                          ? `${BACKEND_SERVER_BASE_URL}${selectedLibrarian.evidence?.evidenceTwo}`
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

  // return (
  //   <div>
  //     <Dialog>
  //       <DialogTrigger>
  //         <Eye size={20} />
  //       </DialogTrigger>

  //       <DialogContent aria-describedby={undefined}>
  //         <DialogHeader>
  //           <DialogTitle>View Librarian</DialogTitle>
  //         </DialogHeader>
  //         <hr />
  //         {checkUserType() != null && checkUserType() != undefined ? (
  //           <div className="flex flex-row w-[vh]">
  //             <div className="flex flex-col gap-2">
  //               <div>
  //                 <p>Name: {checkUserType().name}</p>
  //               </div>
  //               <div>
  //                 <p>Contact: {checkUserType().contactNumber}</p>
  //               </div>
  //               <div>
  //                 <p>Email: {checkUserType().email}</p>
  //               </div>
  //               <div>
  //                 <p>Address: {checkUserType().address}</p>
  //               </div>
  //               <div className="flex flex-row justify-between">
  //                 <div>
  //                   <p>Applied Date: {checkUserType().appliedDate}</p>
  //                 </div>
  //                 <div>
  //                   <p>Verified Date: {checkUserType().verifiedDate}</p>
  //                 </div>
  //               </div>
  //             </div>

  //             {checkUserType()?.evidences?.length > 2 && (
  //               <div>
  //                 <div>
  //                   <a
  //                     href={
  //                       BACKEND_SERVER_BASE_URL +
  //                       checkUserType().evidences[0]?.userImage
  //                     }
  //                     target="_blank"
  //                   >
  //                     <img
  //                       src={
  //                         BACKEND_SERVER_BASE_URL +
  //                         checkUserType().evidences[0]?.userImage
  //                       }
  //                       alt="User Image Loading!!!"
  //                     />
  //                   </a>
  //                 </div>

  //                 <div>
  //                   <div>
  //                     <a
  //                       href={
  //                         BACKEND_SERVER_BASE_URL +
  //                         checkUserType().evidences[0]?.evidenceOne
  //                       }
  //                       target="_blank"
  //                     >
  //                       <img
  //                         src={
  //                           BACKEND_SERVER_BASE_URL +
  //                           checkUserType().evidences[0]?.evidenceOne
  //                         }
  //                         alt="Evidence1 Loading!!!"
  //                       />
  //                     </a>
  //                   </div>
  //                   <div>
  //                     <a
  //                       href={
  //                         BACKEND_SERVER_BASE_URL +
  //                         checkUserType().evidences[0]?.evidenceTwo
  //                       }
  //                       target="_blank"
  //                     >
  //                       <img
  //                         src={
  //                           BACKEND_SERVER_BASE_URL +
  //                           checkUserType().evidences[0]?.evidenceTwo
  //                         }
  //                         alt="Evidence2 Loading!!!"
  //                       />
  //                     </a>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         ) : (
  //           <p>Does not exist</p>
  //         )}
  //       </DialogContent>
  //     </Dialog>
  //   </div>
  // );
};

export default ViewLibrarian;
