import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ChevronRight, File } from "lucide-react";
import { NavLink } from "react-router-dom";

const HoverReports = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="py-2">
          <div className="py-2 px-4 hover:bg-gray-700 hover:text-white flex flex-row items-center cursor-pointer rounded">
            <File className="mr-2" />
            Reports
            <ChevronRight className="ml-auto" />
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-auto py-2 px-2 m-1" side="right">
        <div className="py-0 my-0 pr-0.5">
          <NavLink
            to="/admin/reports/catalog-summary"
            className="py-1 px-1.5 pr-3 hover:bg-gray-700 hover:text-white flex flex-row items-center rounded"
          >
            <ChevronRight className="mr-0.5" />
            Catalog Summary
          </NavLink>
        </div>

        <div className="py-0 my-0 pr-0.5">
          <NavLink
            to="/admin/reports/top-borrowed-books"
            className="py-1 px-1.5 pr-3 hover:bg-gray-700 hover:text-white flex flex-row items-center rounded"
          >
            <ChevronRight className="mr-0.5" />
            Top Borrowed Books
          </NavLink>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverReports;
