import { useEffect} from "react";
import { useFetchCategory } from "../../hooks/useFetchCategory";
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
