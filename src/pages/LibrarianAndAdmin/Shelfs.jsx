import { useFetchShelfs } from "../../hooks/useFetchShelfs";
import { Input } from "@/components/ui/input";
import AddShelf from "@/features/LibrarianAndAdmin/Shelf/AddShelf";

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";

import UpdateShelf from "@/features/LibrarianAndAdmin/Shelf/UpdateShelf";
import Delete from "@/components/Delete";
import ViewShelf from "@/features/LibrarianAndAdmin/Shelf/ViewShelf";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/table/LibrarianAndAdmin/shelfs/data-table";
import { columns } from "@/components/table/LibrarianAndAdmin/shelfs/columns";

const Shelfs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredShelfs, setFilteredShelfs] = useState([]);
  const {
    data: shelfs,
    refetch: refetchShelfs,
    isLoading,
    error,
  } = useFetchShelfs();

  useEffect(() => {
    refetchShelfs();
  }, []);

  // useEffect(() => {
  //   console.log(shelfs);
  //   if (shelfs?.status === 200 && Array.isArray(shelfs?.data)) {
  //     const lowerSearch = searchTerm.toLowerCase();

  //     const filtered = shelfs.data.filter((shelf) =>
  //       shelf.name?.toLowerCase().includes(lowerSearch)
  //     );
  //     setFilteredShelfs(searchTerm.trim() === "" ? shelfs.data : filtered);
  //   } else {
  //     setFilteredShelfs([]);
  //   }
  // }, [shelfs, searchTerm]);

  return (
    // <div>
    //   <div className="flex flex-row items-center">
    //     <h1>Available Shelfs</h1>
    //     <AddShelf />
    //     <Input
    //       type="text"
    //       placeholder="Search here"
    //       className="w-55 bg-white"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //   </div>
    //   <Table className="bg-white rounded-2xl mt-3">
    //     <TableHeader>
    //       <TableRow>
    //         <TableHead>Id</TableHead>
    //         <TableHead>Name</TableHead>
    //         <TableHead>Added Date</TableHead>
    //         <TableHead>Updated Date</TableHead>
    //         <TableHead>Capacity</TableHead>
    //         <TableHead>Category</TableHead>
    //         <TableHead>Actions</TableHead>
    //       </TableRow>
    //     </TableHeader>
    //     <TableBody>
    //       {isLoading && (
    //         <TableRow>
    //           <TableCell>Loading...</TableCell>
    //         </TableRow>
    //       )}
    //       {Array.isArray(filteredShelfs) && filteredShelfs.length > 0 ? (
    //         filteredShelfs.map((element, index) => (
    //           <TableRow key={element.shelfId || index}>
    //             <TableCell>{element.shelfId}</TableCell>
    //             <TableCell>{element.name}</TableCell>
    //             <TableCell>{element.addedDate}</TableCell>
    //             <TableCell>{element.updatedDate}</TableCell>
    //             <TableCell>{element.capacity}</TableCell>
    //             <TableCell>{element.category.name}</TableCell>
    //             <TableCell className="flex flex-row justify-center items-center">
    //               <UpdateShelf id={element.shelfId} />
    //               <ViewShelf id={element.shelfId} />
    //               <Delete
    //                 id={element.shelfId}
    //                 name={element.name}
    //                 type={"shelf"}
    //               />
    //             </TableCell>
    //           </TableRow>
    //         ))
    //       ) : (
    //         <TableRow>
    //           <TableCell colSpan={7} className="text-center">
    //             {searchTerm.trim()
    //               ? "No matching shelfs found!"
    //               : Array.isArray(shelfs?.data)
    //               ? "No shelfs available!"
    //               : shelfs?.data?.message || "No shelfs available!"}
    //           </TableCell>
    //         </TableRow>
    //       )}
    //     </TableBody>
    //   </Table>
    // </div>

    <section className="min-h-screen">
      {shelfs?.data && (
        <div>
          <DataTable columns={columns} data={shelfs?.data || []} />
        </div>
      )}
    </section>
  );
};

export default Shelfs;
