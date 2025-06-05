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

  return (
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
