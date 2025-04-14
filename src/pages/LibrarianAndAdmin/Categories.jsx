import { useFetchCategory } from "../../hooks/useFetchCategory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import Delete from "@/components/Delete";
import AddCategory from "@/features/LibrarianAndAdmin/Categories/AddCategory";
import { Input } from "@/components/ui/input";
import ViewCategory from "@/features/LibrarianAndAdmin/Categories/ViewCategory";
import UpdateCategory from "@/features/LibrarianAndAdmin/Categories/UpdateCategory";
import { DataTable } from "@/components/table/LibrarianAndAdmin/Categories/data-table";
import { columns } from "@/components/table/LibrarianAndAdmin/Categories/columns";

const Categories = () => {
  const { data: categories, refetch: refetchCategories } = useFetchCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    refetchCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
    if (categories?.status === 200 && Array.isArray(categories?.data)) {
      const lowerSearch = searchTerm.toLowerCase();

      const filtered = categories.data.filter((category) =>
        category.name?.toLowerCase().includes(lowerSearch)
      );

      setFilteredCategories(
        searchTerm.trim() === "" ? categories.data : filtered
      );
    } else {
      setFilteredCategories([]);
    }
  }, [categories, searchTerm]);

  return (
    // <div>
    //   <div className="flex flex-row  justify-between gap-4">
    //     <h1>Available Categories</h1>
    //     <div className="flex items-center gap-1">
    //       <AddCategory />
    //       <Input
    //         type="text"
    //         placeholder="Search here"
    //         className="bg-white w-[220px]"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //       />
    //     </div>
    //   </div>

    //   <div className="bg-white rounded-[8px] mt-4">
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead>Id</TableHead>
    //           <TableHead>Name</TableHead>
    //           <TableHead>Starting Number</TableHead>
    //           <TableHead>Ending Number</TableHead>
    //           <TableHead>Added Date</TableHead>
    //           <TableHead>Updated Date</TableHead>
    //           <TableHead>Actions</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {Array.isArray(filteredCategories) &&
    //         filteredCategories.length > 0 ? (
    //           filteredCategories.map((element, index) => (
    //             <TableRow key={element.categoryId || index}>
    //               <TableCell>{element.categoryId}</TableCell>
    //               <TableCell>{element.name}</TableCell>
    //               <TableCell>{element.startingNumber}</TableCell>
    //               <TableCell>{element.endingNumber}</TableCell>
    //               <TableCell>{element.addedDate}</TableCell>
    //               <TableCell>{element.updatedDate}</TableCell>
    //               <TableCell className="flex flex-row justify-center items-center">
    //                 <div className="relative group">
    //                   <UpdateCategory id={element.categoryId} />
    //                   <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //                     Update category
    //                   </span>
    //                 </div>

    //                 <div className="relative group">
    //                   <ViewCategory id={element.categoryId} />
    //                   <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //                     View category
    //                   </span>
    //                 </div>

    //                 <div className="relative group">
    //                   <Delete
    //                     id={element.categoryId}
    //                     name={element.name}
    //                     type={"category"}
    //                   />
    //                   <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-600 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //                     Delete category
    //                   </span>
    //                 </div>
    //               </TableCell>
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan={6} className="text-center">
    //               {searchTerm.trim()
    //                 ? "No matching books found."
    //                 : Array.isArray(categories?.data)
    //                 ? "No books available."
    //                 : categories?.data?.message || "No books available."}
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </div>

    <section>
      {categories?.data && (
        <div>
          <DataTable columns={columns} data={categories?.data} />
        </div>
      )}
    </section>
  );
};

export default Categories;
