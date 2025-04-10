import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Delete from "@/components/Delete";
import VerifyMember from "./VerifyMember";
import ViewMember from "./ViewMember";
import { useEffect } from "react";

const NonVerifiedMembers = () => {
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } =
    useFetchNonVerifiedMembers();

  useEffect(() => {
    refetchNonVerifiedMembers();
  }, []);

  return (
    <div className="bg-white mt-4 rounded-[8px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(nonVerifiedMembers?.status === 500 ||
            nonVerifiedMembers?.status === 404) && (
            <p>{nonVerifiedMembers?.data}</p>
          )}

          {nonVerifiedMembers?.status === 200 &&
          Array.isArray(nonVerifiedMembers?.data) &&
          nonVerifiedMembers?.data?.length > 0 ? (
            nonVerifiedMembers?.data?.map((element, index) => (
              <TableRow key={element.userId || index}>
                <TableCell>{element.userId}</TableCell>
                <TableCell>{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>{element.contactNumber}</TableCell>
                <TableCell className="flex flex-row justify-center items-center">
                  <div className="relative group">
                    <VerifyMember id={element.userId} />
                    <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Verify Member
                    </span>
                  </div>

                  <div className="relative group">
                    <ViewMember id={element.userId} type={"nonvm"} />
                    <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Member
                    </span>
                  </div>

                  <div className="relative group">
                    <Delete
                      id={element.userId}
                      name={element.name}
                      type={"user"}
                    />
                    <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Delete Member
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="100%" className="text-center">
                {nonVerifiedMembers?.data?.message}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default NonVerifiedMembers;
