import { Input } from "../../components/ui/input";
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "../../components/ui/table";
import Delete from "@/components/Delete";
import ViewLibrarian from "@/features/Admin/ViewLibrarian";
import UpdateLibrarian from "@/features/Admin/UpdateLibrarian";
import useFetchLibrarian from "@/hooks/useFetchLibrarian";
import AddLibrarian from "@/features/Admin/AddLibrarian";
import { useEffect } from "react";
import { DataTable } from "@/components/table/Admin/librarians/data-table";
import { columns } from "@/components/table/Admin/librarians/columns";

const Librarians = () => {
  const {
    data: librarians,
    refetch: refetchLibrarians,
    isLoading,
    error,
  } = useFetchLibrarian();

  useEffect(() => {
    refetchLibrarians();
  }, []);

  useEffect(() => {
    console.log(librarians);
  }, [librarians]);

  return (
    // <section>
    //   <div className="flex flex-flex md:items-center gap-4">
    //     <h1 className="text-xl">Active Librarians</h1>
    //     <AddLibrarian />
    //     <Input placeholder="Search here" className="bg-white mr-3 w-50"></Input>
    //   </div>
    //   <div>
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead>Id</TableHead>
    //           <TableHead>Name</TableHead>
    //           <TableHead>Email</TableHead>
    //           <TableHead>Contact</TableHead>
    //           <TableHead>Actions</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {librarians?.status === 404 && (
    //           <TableRow>
    //             <TableCell colSpan="100%" className="text-center">
    //               {librarians?.data}
    //             </TableCell>
    //           </TableRow>
    //         )}

    //         {librarians?.status === 500 && (
    //           <TableRow>
    //             <TableCell colSpan="100%" className="text-center">
    //               {librarians?.data}
    //             </TableCell>
    //           </TableRow>
    //         )}

    //         {librarians?.status === 200 && Array.isArray(librarians?.data) ? (
    //           librarians?.data?.map((element, index) => (
    //             <TableRow key={element.userId || index}>
    //               <TableCell>{element.userId}</TableCell>
    //               <TableCell>{element.name}</TableCell>
    //               <TableCell>{element.email}</TableCell>
    //               <TableCell>{element.contactNumber}</TableCell>
    //               <TableCell className="flex flex-row justify-center items-center">
    //                 <UpdateLibrarian id={element.userId} />
    //                 <ViewLibrarian id={element.userId} />
    //                 <Delete
    //                   id={element.userId}
    //                   name={element.name}
    //                   type={"user"}
    //                 />
    //               </TableCell>
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan="100%" className="text-center">
    //               {librarians?.data?.message}
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </section>

    <section>
      {librarians?.data && (
        <div>
          <DataTable columns={columns} data={librarians?.data} />
        </div>
      )}
    </section>
  );
};

export default Librarians;
