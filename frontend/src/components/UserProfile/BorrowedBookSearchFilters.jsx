import React from "react";
import { Input } from "@/components/ui/input";

const BorrowedBookSearchFilters = ({
  filters,
  setFilters,
  categories,
  languages,
}) => {
  return (
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
  );
};

export default BorrowedBookSearchFilters;
