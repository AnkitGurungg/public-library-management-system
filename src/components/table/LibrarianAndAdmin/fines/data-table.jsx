import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
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

export function DataTable({ columns, data = [] }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  // const categories = [
  //   ...new Set(
  //     data
  //       .map((fine) => fine?.returns?.borrows?.borrowBooks?.category?.name)
  //       .filter(Boolean)
  //   ),
  // ];

  // const books = [
  //   ...new Set(
  //     data
  //       .map((book) => book?.returns?.borrows?.borrowBooks?.title)
  //       .filter(Boolean)
  //   ),
  // ];

  let books = [];
  let categories = [];

  if (Array.isArray(data)) {
    books = [
      ...new Set(
        data
          .map((book) => book?.returns?.borrows?.borrowBooks?.title)
          .filter(Boolean)
      ),
    ];

    categories = [
      ...new Set(
        data
          .map((fine) => fine?.returns?.borrows?.borrowBooks?.category?.name)
          .filter(Boolean)
      ),
    ];
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-1 justify-between pb-4">
        <Input
          className="w-1/3 h-10 bg-white border-gray-300"
          placeholder="Search by name..."
          value={table.getColumn("userName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("userName")?.setFilterValue(event.target.value)
          }
        />

        <div className="flex gap-2.5">
          <select
            className="border rounded-lg text-gray-800 px-3 py-2 bg-white"
            value={table.getColumn("title")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          >
            <option value="" disabled selected>
              Select title
            </option>
            <option value="">ALL</option>
            {books.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg text-gray-800 px-3 py-2 bg-white"
            value={table.getColumn("category")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("category")?.setFilterValue(e.target.value)
            }
          >
            <option value="" disabled selected>
              Select category
            </option>
            <option value="">ALL</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg text-gray-800 px-3 py-2 bg-white "
            value={table.getColumn("status")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("status")?.setFilterValue(e.target.value)
            }
          >
            <option value="" disabled selected>
              Select paid status
            </option>
            <option value="">ALL</option>
            <option value={true}>YES</option>
            <option value={false}>NO</option>
          </select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="border-b-[2px] border-[rgba(0,0,0,0.5)] text-black font-bold">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-gray-700 font-medium uppercase"
                    >
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
          <TableBody className="p-0">
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
