import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import GLOBAL_SERVICE from "@/services/GlobalServices";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const WishListCard = ({ currWishListBook }) => {
  const { data: memberWishList, refetch: refetchMemberWishList } =
    useFetchMemberWishList();

  const removeHandler = async () => {
    console.log(currWishListBook.wishListId);
    try {
      const response = await GLOBAL_SERVICE.delete(
        `/api/v1/m/wishlist/delete/${currWishListBook.wishListId}`
      );
      if (response.status === 200) {
        refetchMemberWishList();
        alert(`${currWishListBook.book.title} has been removed!`);
      }
    } catch (error) {
      alert("Could not delete the book");
    }
  };

  // return (
  //   <div className="border-b pb-4">
  //     <div className="flex">
  //       <div className="w-24 h-32 bg-gray-200 mr-4 flex-shrink-0 overflow-hidden">
  //         {currWishListBook.book.imageURL ? (
  //           <img
  //             src={`${BACKEND_SERVER_BASE_URL}${
  //               currWishListBook.book.imageURL || "/public/react.svg"
  //             }`}
  //             alt={currWishListBook.book.title || "Book cover"}
  //             className="w-full h-full object-cover"
  //             onError={(e) => {
  //               e.target.onerror = null;
  //               e.target.src = "/placeholder.svg?height=128&width=96";
  //             }}
  //           />
  //         ) : (
  //           <div className="w-full h-full flex items-center justify-center bg-gray-300">
  //             <span className="text-xs text-gray-500">No image</span>
  //           </div>
  //         )}
  //       </div>

  //       <div className="flex-1">
  //         <div className="flex justify-between">
  //           <div>
  //             <h3 className="text-lg font-medium">
  //               {currWishListBook.book.title || "Untitled"}
  //             </h3>
  //             <p className="text-gray-600">
  //               By {currWishListBook.book.author || "Unknown Author"}
  //             </p>
  //           </div>
  //           <div>
  //             <span className="text-[#206ea6]">
  //               {currWishListBook.book?.category?.name || "Uncategorized"}
  //             </span>
  //           </div>
  //         </div>

  //         <div className="mt-4 flex justify-between items-center">
  //           <div>
  //             <p className="text-sm">
  //               {currWishListBook.book.available !== false ? (
  //                 <>Available Quantity: {currWishListBook.book.quantity || 0}</>
  //               ) : (
  //                 "Not Available"
  //               )}
  //             </p>
  //           </div>
  //           <button
  //             onClick={removeHandler}
  //             className="px-4 py-2 border border-gray-300 rounded text-red-500 hover:text-red-700 hover:bg-red-50"
  //           >
  //             Remove
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <Card
      key={currWishListBook.book.bookId}
      className="overflow-hidden border rounded-lg"
    >
      <div className="relative h-60 w-full bg-gray-100">
        <img
          src={currWishListBook.book.imageURL || "/placeholder.svg"}
          alt={currWishListBook.book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-1">
          {currWishListBook.book.title || "feijf"}
        </h2>
        <p className="text-gray-600 mb-3">
          {currWishListBook.book.author || "knc"}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {currWishListBook.book.category?.name || "Not "}
          </Badge>
          <span className="text-sm text-gray-500">
            {/* Added: {new Date(book.dateAdded).toLocaleDateString()} */}
          </span>
        </div>

        <Button
          variant="default"
          className="w-full flex items-center justify-center gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Details
        </Button>
      </div>
    </Card>
  );
};

export default WishListCard;
