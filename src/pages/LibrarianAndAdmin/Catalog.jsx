import { useState } from "react";
import BorrowBook from "@/features/LibrarianAndAdmin/Catalog/BorrowBook";
import OverdueBooks from "@/features/LibrarianAndAdmin/Catalog/OverdueBooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BorrowedBooks from "@/features/LibrarianAndAdmin/Catalog/BorrowedBooks";

const Catalog = () => {
  const [showBB, setShowBB] = useState(true);
  const [showOB, setShowOB] = useState(false);

  return (
    <div class="w-full overflow-hidden">
      <div className="flex flex-row gap-80">
        <div className="flex flex-row items-center gap-2">
          <Button
            onClick={() => {
              setShowBB(true);
              setShowOB(false);
            }}
          >
            Borrowed Books
          </Button>

          <Button
            onClick={() => {
              setShowBB(false);
              setShowOB(true);
            }}
            className="bg-white text-black hover:bg-white"
          >
            Overdue books
          </Button>
        </div>

        <div className="flex flex-row gap-2">
          <BorrowBook />
          <Input
            type="number"
            placeholder="Search here"
            className="bg-white w-[240px]"
          />
        </div>
      </div>
      {showBB && <BorrowedBooks />}
      {showOB && <OverdueBooks />}
    </div>
  );
};

export default Catalog;
