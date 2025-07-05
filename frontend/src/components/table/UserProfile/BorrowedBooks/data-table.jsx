import React from "react";
import { Button } from "@/components/ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
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

export function DataTable({
  columns,
  data,
  isLoading,
  pageCount,
  pagination,
  setPagination,
  filters,
  setFilters,
  categories,
  languages,
}) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    onPaginationChange: setPagination,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="rounded-md pt-0 bg-white">
        <div className="mb-3 px-2 flex items-center justify-between">
          <Input
            className="w-1/3 bg-[#f1f1f1] h-11 placeholder:text-sm placeholder:text-gray-500 border border-gray-200"
            placeholder="Search by title..."
            value={filters.title ?? ""}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <div className="flex gap-2.5">
            <select
              className="border text-base font-normal rounded-lg text-gray-600 px-3 py-2 bg-[#f1f1f1] border-gray-200"
              value={filters.categoryId ?? ""}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value, 10);

                setFilters((prev) => ({
                  ...prev,
                  categoryId: Number.isNaN(value) ? null : value,
                }));
              }}
            >
              <option value="" disabled className="placeholder:text-sm">
                Select category
              </option>
              <option value="">ALL</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <select
              className="border text-base font-normal rounded-lg text-gray-600 px-3 py-2 bg-[#f1f1f1] border-gray-200"
              value={filters.language ?? ""}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, language: e.target.value }))
              }
            >
              <option value="" disabled className="placeholder:text-sm">
                Select language
              </option>
              <option value="">ALL</option>
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              className="border text-base font-normal rounded-lg text-gray-600 px-3 py-2 bg-[#f1f1f1] border-gray-200"
              value={filters.extended ?? ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  extended:
                    e.target.value === ""
                      ? null
                      : e.target.value === "true"
                        ? true
                        : false,
                }))
              }
            >
              <option value="" disabled className="plceholder:text-sm">
                Select extended status
              </option>
              <option value="">ALL</option>
              <option value="true">YES</option>
              <option value="false">NO</option>
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
                      className="bg-[#f1f1f1] text-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
          className="bg-gray-100 text-black"
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {pagination?.pageIndex + 1} of {pageCount <= 0 ? 1 : pageCount}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-gray-100 text-black"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
