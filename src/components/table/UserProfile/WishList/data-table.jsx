import { useEffect, useState } from "react";
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

export function DataTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const categories = Array.isArray(data)
    ? [
        ...new Set(
          data.map((wishlist) => wishlist?.book?.category?.name).filter(Boolean)
        ),
      ]
    : [];

  const languages = Array.isArray(data)
    ? [
        ...new Set(
          data.map((wishlist) => wishlist?.book?.language).filter(Boolean)
        ),
      ]
    : [];

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
      <div className="rounded-md  pt-0 bg-white">
        <div className="mb-3 px-2 flex items-center justify-between">
          <Input
            className="w-1/3 bg-[#f1f1f1] h-11 placeholder:text-sm placeholder:text-gray-500 border border-gray-200"
            placeholder="Search by title..."
            value={table.getColumn("title")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
          />
          <div className="flex gap-2.5">
            <select
              className="border text-base font-normal rounded-lg text-gray-600 px-3 py-2 bg-[#f1f1f1] border-gray-200"
              value={table.getColumn("category")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("category")?.setFilterValue(e.target.value)
              }
            >
              <option
                value=""
                disabled
                selected
                className="placeholder:text-sm"
              >
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
              className="border text-base font-normal rounded-lg text-gray-600 px-3 py-2 bg-[#f1f1f1] border-gray-200"
              value={table.getColumn("language")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("language")?.setFilterValue(e.target.value)
              }
            >
              <option
                value=""
                disabled
                selected
                className="placeholder:text-sm"
              >
                Select language
              </option>
              <option value="">ALL</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Table className="w-full p-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${
                        header.column.id === "Action"
                          ? "bg-[#f1f1f1] text-red-500"
                          : "bg-[#f1f1f1] text-black"
                      }`}
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
                  className="p-0"
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
                  colSpan={columns.length}
                  className="h-14 text-center"
                >
                  No WishList.
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
