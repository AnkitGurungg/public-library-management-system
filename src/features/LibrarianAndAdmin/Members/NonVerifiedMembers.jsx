import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
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

const NonVerifiedMembers = () => {
  const { data: nonVerifiedMembers, refetch: refetchNonVerifiedMembers } = useFetchNonVerifiedMembers();
  console.log(nonVerifiedMembers);

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
          {nonVerifiedMembers?.status === 404 && <TableRow>{nonVerifiedMembers?.data}</TableRow>}
          {nonVerifiedMembers?.status === 500 && <p>{nonVerifiedMembers?.data}</p>}
          {nonVerifiedMembers?.status===200 && nonVerifiedMembers?.data?.map((element, index) => (
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

export default NonVerifiedMembers;