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
  pagination,
  setPagination,
  pageCount,
  isLoading,
  filters,
  setFilters,
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
    <>
      <div className="flex items-center py-1 justify-between pb-4 bg-gray-100">
        <Input
          className="w-1/4 h-10 bg-white border-gray-300"
          placeholder="Search by name..."
          value={filters.name}
          onChange={(e) =>
            setFilters({
              ...filters,
              name: e.target.value,
            })
          }
        />
        <div className="flex gap-2.5">
          <select
            className="border rounded-lg text-gray-800 px-3 py-2 bg-white "
            value={filters.extended ?? ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                extended:
                  e.target.value === "" ? null : e.target.value === "true",
              })
            }
          >
            <option value="" disabled>
              Select Extended Status
            </option>
            <option value="">ALL</option>
            <option value="true">YES</option>
            <option value="false">NO</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2  bg-white"
            value={filters.returnStatus ?? ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                returnStatus:
                  e.target.value === "" ? null : e.target.value === "true",
              })
            }
          >
            <option value="" disabled>
              Select Returns Status
            </option>
            <option value="">ALL</option>
            <option value="true">YES</option>
            <option value="false">NO</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="rounded-md border">
          <Table>
            <TableHeader className="border-b-[2px] border-[rgba(0,0,0,0.5)]">
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
            className="bg-white text-black"
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {pagination.pageIndex + 1} of {pageCount <= 0 ? 1 : pageCount}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-white text-black"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
