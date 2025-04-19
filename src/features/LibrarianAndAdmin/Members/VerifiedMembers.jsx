import { useFetchVerifiedMembers } from "@/hooks/useFetchVerifiedMembers";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { columns } from "@/components/table/LibrarianAndAdmin/members/Members/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/members/Members/data-table";

const VerifiedMembers = () => {
  const { data: verifiedMembers, refetch: refetchVerifiedMembers } =
    useFetchVerifiedMembers();

  useEffect(() => {
    refetchVerifiedMembers();
  }, []);

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      {/* <Table>
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
          {verifiedMembers?.status === 404 && (
            <TableRow>{verifiedMembers?.data}</TableRow>
          )}
          {verifiedMembers?.status === 500 && <p>{verifiedMembers?.data}</p>}

          {verifiedMembers?.status === 200 &&
          Array.isArray(verifiedMembers?.data) &&
          verifiedMembers?.data?.length > 0 ? (
            verifiedMembers?.data?.map((element, index) => (
              <TableRow key={element.userId || index}>
                <TableCell>{element.userId}</TableCell>
                <TableCell>{element.name}</TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>{element.contactNumber}</TableCell>
                <TableCell className="flex flex-row justify-center items-center">
                  <div className="relative group">
                    <ViewMember id={element.userId} type={"vm"} />
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
                {verifiedMembers?.data?.message}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table> */}
      <div>
        <DataTable columns={columns} data={verifiedMembers?.data || []} />
      </div>
    </div>
  );
};

export default VerifiedMembers;
