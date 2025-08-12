import {
  Book,
  Calendar,
  ChevronDown,
  ChevronUp,
  Globe,
  Hash,
} from "lucide-react";
import GLOBAL_SERVICE, {
  S3_BASE_URL,
} from "@/services/GlobalServices";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/UserContext";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useFetchMemberWishListIds } from "@/hooks/useFetchMemberWishListIds";

export default function ViewSpecificBook() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [book, setBook] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const { token, setToken, userInfo } = useContext(UserContext);
  const { data: memberWishListIds, refetch: refetchMemberWishListIds } =
    useFetchMemberWishListIds(!!token);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
  }, []);

  const getBook = async () => {
    try {
      const response = await GLOBAL_SERVICE.get(
        `/api/v1/p/resource/books/${bookId}`,
      );
      // console.log(response);

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
    e.stopPropagation();

    if (!token) {
      toast.error("Please Login!");
      return;
    }

    try {
      const response = await GLOBAL_SERVICE.post("/api/v1/m/wishlists", {
        bookId: book.bookId,
      });
      refetchMemberWishListIds();
      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error("Error! Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="md:sticky md:top-20">
            <div className="p-6 rounded-lg flex flex-col space-y-3 justify-center items-center h-auto">
              <img
                src={`${S3_BASE_URL}/${book?.imageURL}`}
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

              {Array.isArray(memberWishListIds) &&
              memberWishListIds?.some((item) => item === book?.bookId) ? (
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
            {book?.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">by {book?.author}</p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-0">Synopsis</h2>
            <div className="space-y-3 text-gray-700">
              <p className="text-justify">
                {book?.description && isExpanded
                  ? book?.description
                  : book?.description?.length > 300
                    ? `${book?.description?.slice(0, 300)}...`
                    : book?.description}

                {(!book?.description || book.description.length === 0) &&
                  "No description available."}
              </p>
            </div>

            <div className="mt-6">
              <Button
                className="text-black bg-white p-0 h-auto font-medium flex items-center hover:bg-white hover:text-[#2c5282]"
                onClick={toggleReadMore}
              >
                {book?.description?.length > 0 &&
                  (isExpanded ? (
                    <>
                      Read Less
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read More
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  ))}
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
