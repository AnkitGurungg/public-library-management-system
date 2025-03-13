import { useFetchCategory } from "../../hooks/useFetchCategory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Delete from "@/components/Delete";
import AddCategory from "@/features/LibrarianAndAdmin/Categories/AddCategory";
import { Input } from "@/components/ui/input";

const Categories = () => {
  const { data: categories } = useFetchCategory();
  console.log(categories?.data);
  console.log(categories?.status);

  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <h1>Category Management</h1>
        <AddCategory />
        <Input
          type="text"
          placeholder="Search here"
          className="bg-white w-[220px]"
        />
      </div>

      <div className="bg-white rounded-[8px] mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Starting Number</TableHead>
              <TableHead>Ending Number</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead>Updated Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.status === 404 || categories?.status === 500 ? (
              <TableRow>
                <TableCell>{categories?.data}</TableCell>
              </TableRow>
            ) : (
              categories?.data?.map((element, index) => (
                <TableRow key={element.categoryId || index}>
                  <TableCell>{element.categoryId}</TableCell>
                  <TableCell>{element.name}</TableCell>
                  <TableCell>{element.startingNumber}</TableCell>
                  <TableCell>{element.endingNumber}</TableCell>
                  <TableCell>{element.addedDate}</TableCell>
                  <TableCell>{element.updatedDate}</TableCell>
                  <TableCell>
                    <Delete
                      id={element.categoryId}
                      name={element.name}
                      type={"category"}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Categories;
