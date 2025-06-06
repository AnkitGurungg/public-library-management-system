import React, { useContext, useEffect, useState } from "react";
import {
  Book,
  Calendar,
  ChevronDown,
  ChevronUp,
  Globe,
  Hash,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import AddToWishList from "./AddToWishList";
import toast from "react-hot-toast";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import { UserContext } from "@/contexts/UserContext";

export default function ViewSpecificBook() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const { token, setToken, userInfo } = useContext(UserContext);
  const { data: memberWishList, refetch: refetchMemberWishList } =
    useFetchMemberWishList();

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
  }, []);

  const getBook = async () => {
    try {
      const response = await GLOBAL_SERVICE.get(
        `/api/v1/la/book/get/${bookId}`
      );
      console.log(response);
      if (response?.status === 200 && Object.keys(response?.data).length > 0) {
        setBook(response?.data);
      }
    } catch (error) {
      if (
        error.status === 404 ||
        error.status === 500 ||
        error.status === 400
      ) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleAddToWishlist = async (e) => {
    console.log("cliked");
    e.stopPropagation();

    if (!token) {
      toast.error("Please Login!");
      return;
    }

    try {
      const response = await GLOBAL_SERVICE.post("/api/v1/m/wishlists", {
        bookId: book.bookId,
      });
      refetchMemberWishList();
      toast.success("Added to wishlist!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Please try again!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="md:sticky md:top-20">
            <div className="p-6 rounded-lg flex flex-col space-y-3 justify-center items-center h-auto">
              <img
                src={`${BACKEND_SERVER_BASE_URL}${book?.imageURL}`}
                alt="Nexus: A Brief History of Information Networks from the Stone Age to AI"
                className="object-cover"
              />
              <Badge variant="outline" className="px-3 py-1 bg-blue-100">
                {book?.quantity > 0 ? (
                  <span className="text-sm font-medium text-[#206ea6] bg-blue-100">
                    In Stock
                  </span>
                ) : (
                  <span className="text-sm font-medium text-red-500">
                    Out of Stock
                  </span>
                )}
              </Badge>

              {memberWishList?.data?.some(
                (wishlistBook) => wishlistBook?.bookId === book?.bookId
              ) ? (
                <Button
                  onClick={() => navigate("/member/profile/wish-list")}
                  className="w-full text-white border-1 border-[#206ea6] bg-[#206ea6] uppercase hover:text-[#206ea6] hover:bg-white  rounded-none"
                >
                  View WishList
                </Button>
              ) : (
                <Button
                  onClick={handleAddToWishlist}
                  className="w-full bg-white border-1 border-[#206ea6] text-[#206ea6] uppercase hover:bg-[#206ea6] hover:text-white rounded-none"
                >
                  Add to WishList
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-xl md:text-3xl lg:text-2xl font-bold leading-tight mb-2 mt-13">
            Nexus: A Brief History of Information Networks from the Stone Age to
            AI
          </h1>
          <p className="text-lg text-gray-600 mb-6">by Yuval Noah Harari</p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-0">Synopsis</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro,
                facere! Provident, voluptate aperiam optio voluptas iure vel,
                dignissimos aspernatur adipisci saepe accusantium quisquam
                assumenda, expedita atque dolorem odit totam perspiciatis!
                Consequuntur veritatis aut dolore a eveniet adipisci sit
                accusantium est quod natus? Id et fuga eaque dignissimos, ut vel
                eos corporis rem aliquid praesentium ea voluptatum, officia
                atque, quo molestiae. Id voluptatibus magni eum placeat. Magnam
                quod vero, dolores ducimus libero vitae illum animi rem nesciunt
                nam adipisci eligendi, error, iure expedita sequi sint
              </p>
            </div>

            <div className="mt-6">
              <Button
                className="text-black bg-white p-0 h-auto font-medium flex items-center hover:bg-white hover:text-[#2c5282]"
                onClick={toggleReadMore}
              >
                {isExpanded ? (
                  <>
                    Read Less
                    <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-bold mb-6">Other Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Book className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">Page Count</h3>
                <p className="font-medium">{book?.pageCount || "N/A"} Pages</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Calendar className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">Published On</h3>
                <p className="font-medium">{book?.publishedDate || "N/A"} </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Hash className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">ISBN</h3>
                <p className="font-medium">{book?.isbn || "N/A"}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Globe className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">Language</h3>
                <p className="font-medium">{book?.language}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />
        </div>
      </div>
    </div>
  );
}
