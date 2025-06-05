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
    <div class="w-full min-h-screen">
      <div className="flex justify-between">
        <div className="flex gap-3">
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
        <BorrowBook />
      </div>

      {showBB && <BorrowedBooks />}
      {showOB && <OverdueBooks />}
    </div>
  );
};

export default Catalog;
