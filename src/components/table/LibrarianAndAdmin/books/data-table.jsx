import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import AddBook from "@/features/LibrarianAndAdmin/Books/AddBook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTable({ columns, data = [] }) {
  const [columnFilters, setColumnFilters] = useState([]);

  // Get unique categories from the data
  const categories = [
    ...new Set(data.map((book) => book.category?.name).filter(Boolean)),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  // Handle category filter change
  const handleCategoryFilter = (value) => {
    if (value === "all") {
      // Clear the category filter
      table.getColumn("category.name")?.setFilterValue(undefined);
    } else {
      // Set the category filter
      table.getColumn("category.name")?.setFilterValue(value);
    }
  };

  return (
    <div className="">
      <div className="flex items-center py-1 justify-between pb-4">
        <Input
          className="w-1/3 h-[39px] bg-white border border-gray-300"
          placeholder="Search by title..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
        />
        <div className="flex gap-2.5">
          {/* <Select onValueChange={handleCategoryFilter}>
            <SelectTrigger className="w-[160px] bg-white border border-gray-300 h-[39px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          <select
            className="border rounded px-3 py-2"
            value={table.getColumn("category")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("category")?.setFilterValue(e.target.value)
            }
          >
            <option value="" disabled selected>
              Select Category
            </option>
            <option value="">ALL</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <AddBook />
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="p-0">
          <TableHeader className="border-b-[2px] border-[rgba(0,0,0,0.5)] text-black font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
