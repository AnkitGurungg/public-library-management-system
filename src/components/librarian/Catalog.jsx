import { useState } from "react";
import BorrowedBooks from "./BorrowedBooks";
import OverdueBooks from "./OverdueBooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import BorrowBook from "./modals/BorrowBook";

const Catalog = () => {
  const [showBB, setShowBB] = useState(true);
  const [showOB, setShowOB] = useState(false);

  return (
    <div>
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
