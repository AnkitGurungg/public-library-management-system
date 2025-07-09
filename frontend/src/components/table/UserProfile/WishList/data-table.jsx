import React from "react";
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
import { Button } from "@/components/ui/button";

export function DataTable({
  columns,
  data,
  pagination,
  setPagination,
  pageCount,
  isLoading,
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
      <div className="rounded-md  pt-0 bg-white">
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
                            header.getContext(),
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
          className="bg-gray-100 text-black"
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
          className="bg-gray-100 text-black"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
