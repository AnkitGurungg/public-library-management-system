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

const Shelfs = () => {
  const { data: shelfs, isLoading } = useFetchShelfs();
  console.log(shelfs?.data);
  console.log(shelfs?.status);

  return (
    <div>
      <div className="flex flex-row items-center">
        <h1>Shelf Management</h1>
        <AddShelf />
        <Input placeholder="Search here" className="w-55 bg-white" />
      </div>
      <Table className="bg-white rounded-2xl mt-3">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Added Date</TableHead>
            <TableHead>Updated Date</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          )}
          {shelfs?.status === 404 || shelfs?.status === 500 ? (
            <TableRow>
              <TableCell>{shelfs.data}</TableCell>
            </TableRow>
          ) : (
            shelfs?.data.map((element, index) => (
              <TableRow key={element.shelfId || index}>
                <TableCell>{element.shelfId}</TableCell>
                <TableCell>{element.name}</TableCell>
                <TableCell>{element.addedDate}</TableCell>
                <TableCell>{element.updatedDate}</TableCell>
                <TableCell>{element.capacity}</TableCell>
                <TableCell>{element.category.name}</TableCell>
                <TableCell className="flex flex-row justify-center items-center">
                  <UpdateShelf id={element.shelfId} />
                  <ViewShelf id={element.shelfId} />
                  <Delete
                    id={element.shelfId}
                    name={element.name}
                    type={"shelf"}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Shelfs;