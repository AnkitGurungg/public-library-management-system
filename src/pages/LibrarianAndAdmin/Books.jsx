import { useFetchBooks } from "../../hooks/useFetchBooks";
import AddBook from "../../features/LibrarianAndAdmin/Books/AddBook";
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
import Delete from "../../components/Delete";
import UpdateBook from "../../features/LibrarianAndAdmin/Books/UpdateBook";

const Books = () => {
  const { data: books } = useFetchBooks();
  console.log(books);

  return (
    <section>
      <div className="flex flex-flex md:items-center gap-4">
        <h1 className="text-xl">Book Management</h1>
        <AddBook />
        <Input placeholder="Search here" className="bg-white mr-3 w-50"></Input>
      </div>

      <div className="bg-white rounded-2xl mt-3 text-black">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books?.data &&
              books?.data.map((element, index) => (
                <TableRow key={element.bookId || index}>
                  <TableCell>{element.bookId}</TableCell>
                  <TableCell>{element.title}</TableCell>
                  <TableCell>{element.category.name}</TableCell>
                  <TableCell>{element.language}</TableCell>
                  <TableCell>{element.quantity}</TableCell>
                  <TableCell>
                    <UpdateBook id={element.bookId}></UpdateBook>
                    <Delete
                      id={element.bookId}
                      name={element.title}
                      type={"book"}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Books;
