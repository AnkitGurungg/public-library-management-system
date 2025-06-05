import { useEffect } from "react";
import useFetchOverdueBooks from "@/hooks/useFetchOverdueBooks";
import { columns } from "@/components/table/LibrarianAndAdmin/catalog/OverdueBook/columns";
import { DataTable } from "@/components/table/LibrarianAndAdmin/catalog/OverdueBook/data-table";

const OverdueBooks = () => {
  const {
    data: overdueBooks,
    refetch: refetchOverdueBooks,
    isLoading,
    error,
  } = useFetchOverdueBooks();

  useEffect(() => {
    console.log(overdueBooks);
  }, [overdueBooks]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="bg-white mt-3 rounded-[8px]">
      <DataTable columns={columns} data={overdueBooks?.data || []} />
    </div>
  );

  // return (
  //   <div className="bg-white mt-4 rounded-[8px]">
  //     <Table>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead>Book Id</TableHead>
  //           <TableHead>User Id</TableHead>
  //           <TableHead>Name</TableHead>
  //           <TableHead>Borrowed date</TableHead>
  //           <TableHead>Due date</TableHead>
  //           <TableHead>Extended</TableHead>
  //           <TableHead>Return status</TableHead>
  //           <TableHead>Action</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       <TableBody>
  //         {overdueBooks?.status === 404 && (
  //           <TableRow>
  //             <TableCell colSpan={7}>{overdueBooks?.data}</TableCell>
  //           </TableRow>
  //         )}
  //         {overdueBooks?.status === 500 && (
  //           <TableRow>
  //             <TableCell colSpan={7}>{overdueBooks?.data}</TableCell>
  //           </TableRow>
  //         )}
  //         {overdueBooks?.status === 200 && Array.isArray(overdueBooks?.data) ? (
  //           overdueBooks?.data?.map((element, index) => (
  //             <TableRow key={element.borrowId || index}>
  //               <TableCell>{element?.borrowBooks.bookId}</TableCell>
  //               <TableCell>{element?.borrowUsers.userId}</TableCell>
  //               <TableCell>{element?.borrowUsers.name}</TableCell>
  //               <TableCell>{element?.borrowDate}</TableCell>
  //               <TableCell>{element?.dueDate}</TableCell>
  //               <TableCell>{element?.extended ? "Yes" : "No"}</TableCell>
  //               <TableCell>{element?.returnStatus ? "Yes" : "No"}</TableCell>
  //               <TableCell>
  //                 {element.returnStatus ? (
  //                   <div className="relative group">
  //                     <CircleCheckBig />
  //                     <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  //                       Already Returned
  //                     </span>
  //                   </div>
  //                 ) : (
  //                   <div className="relative group">
  //                     <ReturnBook id={element.borrowId} />
  //                     <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  //                       Return Book
  //                     </span>
  //                   </div>
  //                 )}
  //               </TableCell>
  //             </TableRow>
  //           ))
  //         ) : (
  //           <TableRow>
  //             <TableCell>{overdueBooks?.data?.message}</TableCell>
  //           </TableRow>
  //         )}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
};

export default OverdueBooks;
