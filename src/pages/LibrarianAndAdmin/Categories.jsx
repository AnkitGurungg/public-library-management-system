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

  useEffect(() => {
    refetchCategories();
  }, []);

  return (
    <section className="min-h-screen">
      {categories?.data && (
        <div>
          <DataTable columns={columns} data={categories?.data || []} />
        </div>
      )}
    </section>
  );
};

export default Categories;
