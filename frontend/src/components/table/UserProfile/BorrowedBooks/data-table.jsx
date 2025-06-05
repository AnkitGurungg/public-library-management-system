import React, { useState } from "react";
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

  console.log(data);
  const categories = Array.isArray(data)
    ? [
        ...new Set(
          data.map((category) => category?.getCategoryName).filter(Boolean)
        ),
      ]
    : [];

  const languages = Array.isArray(data)
    ? [
        ...new Set(
          data.map((language) => language?.getLanguage).filter(Boolean)
        ),
      ]
    : [];

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 7,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    pageCount: Math.ceil(data?.length / pagination?.pageSize),

    onPaginationChange: setPagination,

    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="rounded-md pt-0 bg-white">
        <div className="mb-3 px-2 flex items-center justify-between">
          <Input
            className="w-1/3 bg-[#f1f1f1] h-11 placeholder:text-sm placeholder:text-gray-500 border border-gray-200"
            placeholder="Search by title..."
            value={table.getColumn("getTitle")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("getTitle")?.setFilterValue(event.target.value)
            }
          />
          <div className="flex gap-2.5">
            <select
              className="border text-base font-normal rounded-lg text-gray-600 px-3 py-2 bg-[#f1f1f1] border-gray-200"
              value={table.getColumn("getCategoryName")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table
                  .getColumn("getCategoryName")
                  ?.setFilterValue(e.target.value)
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
              value={table.getColumn("getLanguage")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("getLanguage")?.setFilterValue(e.target.value)
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

            <select
              className="border text-base font-normal rounded-lg text-gray-600 px-3 py-2 bg-[#f1f1f1] border-gray-200"
              value={table.getColumn("isExtended")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("isExtended")?.setFilterValue(e.target.value)
              }
            >
              <option value="" disabled selected className="plceholder:text-sm">
                Select extended status
              </option>
              <option value="">ALL</option>
              <option value={true}>YES</option>
              <option value={false}>NO</option>
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
          className="bg-gray-100 text-black"
        >
          Previous
        </Button>
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
