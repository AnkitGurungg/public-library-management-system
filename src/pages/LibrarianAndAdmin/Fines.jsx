import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "../../components/ui/table";
import { useEffect } from "react";
import { Input } from "../../components/ui/input";
import useFetchFines from "@/hooks/useFetchFines";
import { DataTable } from "@/components/table/LibrarianAndAdmin/fines/data-table";
import { columns } from "@/components/table/LibrarianAndAdmin/fines/columns";

const Fines = () => {
  const {
    data: fines,
    refetch: refetchFines,
    isLoading,
    error,
  } = useFetchFines();

  useEffect(() => {
    refetchFines();
  }, []);

  if (isLoading) return <p>Loading fines...</p>;
  if (error) return <p>Error fetching fines: {error.message}</p>;

  return (
    // <section>
    //   <div className="flex flex-flex md:items-center gap-4">
    //     <h1 className="text-xl">Fines</h1>
    //     <Input placeholder="Search here" className="bg-white mr-3 w-50"></Input>
    //   </div>

    //   <div className="bg-white rounded-2xl mt-3 text-black">
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead>MId</TableHead>
    //           <TableHead>Name</TableHead>
    //           <TableHead>Title</TableHead>
    //           <TableHead>Borrow Date</TableHead>
    //           <TableHead>Due Date</TableHead>
    //           <TableHead>Returned Date</TableHead>
    //           <TableHead>Amount</TableHead>
    //           <TableHead>Status</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {fines?.status === 200 && Array.isArray(fines?.data) ? (
    //           fines.data.map((element, index) => (
    //             <TableRow key={element.fineId || index}>
    //               <TableCell>
    //                 {element?.returns?.borrows?.borrowUsers?.userId ?? "N/A"}
    //               </TableCell>
    //               <TableCell>
    //                 {element?.returns?.borrows?.borrowUsers?.name ?? "N/A"}
    //               </TableCell>
    //               <TableCell>
    //                 {element?.returns?.borrows?.borrowBooks?.title ?? "N/A"}
    //               </TableCell>
    //               <TableCell>
    //                 {element?.returns?.borrows?.borrowDate ?? "N/A"}
    //               </TableCell>
    //               <TableCell>
    //                 {element?.returns?.borrows?.dueDate ?? "N/A"}
    //               </TableCell>

    //               <TableCell>{element?.returns?.returnDate ?? "N/A"}</TableCell>
    //               <TableCell>{element?.totalFine ?? 0}</TableCell>
    //               <TableCell>{element?.paidStatus ? "Yes" : "No"}</TableCell>
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan={7}>
    //               {fines?.data?.message || "No fines available"}
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </section>

    <section className="min-h-screen">
      {fines?.data && (
        <div>
          <DataTable columns={columns} data={fines?.data} />
        </div>
      )}
    </section>
  );
};

export default Fines;
