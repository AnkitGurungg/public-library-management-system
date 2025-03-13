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
import { Indent } from "lucide-react";
import { data } from "react-router-dom";

const VerifiedMembers = () => {
  const { data: verifiedMembers, refetch: refetchVerifiedMembers } = useFetchVerifiedMembers();
  console.log(verifiedMembers);

  return (
    <div>
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
          {verifiedMembers?.status === 404 && <TableRow>{verifiedMembers?.data}</TableRow>}
          {verifiedMembers?.status === 500 && <p>{verifiedMembers?.data}</p>}
          {verifiedMembers?.status===200 && verifiedMembers?.data?.map((element, index) => (
            <TableRow key={element.userId || index}>
              <TableCell>{element.userId}</TableCell>
              <TableCell>{element.name}</TableCell>
              <TableCell>{element.email}</TableCell>
              <TableCell>{element.contactNumber}</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VerifiedMembers;