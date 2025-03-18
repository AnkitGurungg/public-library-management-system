import { useFetchNonVerifiedMembers } from "@/hooks/useFetchNonVerifiedMembers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleRight } from "lucide-react";
import Delete from "@/components/Delete";
import VerifyMember from "./VerifyMember";
import ViewMember from "./ViewMember";

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
              <TableCell className="flex flex-row justify-center items-center">
                <VerifyMember id={element.userId} />
                <ViewMember id={element.userId} type={"nonvm"} />
                <Delete
                  id={element.userId}
                  name={element.name}
                  type={"user"} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NonVerifiedMembers;