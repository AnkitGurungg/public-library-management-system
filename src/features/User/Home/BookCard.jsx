import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/UserContext";
import { useEffect } from "react";
import GLOBAL_SERVICE from "@/services/GlobalServices";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import toast from "react-hot-toast";

const BookCard = ({ curBook }) => {
  const navigate = useNavigate();
  const { token, setToken, userInfo } = useContext(UserContext);
  const { imageURL, title, author } = curBook;
  const { data: memberWishList, refetch: refetchMemberWishList } =
    useFetchMemberWishList();

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
  }, []);

  console.log(memberWishList);

  const specificBookDetails = () => {
    navigate(`/books/book/${curBook.bookId}`);
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();

    if (!token) {
      toast.error("Please Login!");
      return;
    }

    if (userInfo?.role !== "ROLE_MEMBER") {
      toast.error("Not allowed!");
      return;
    }

    try {
      const response = await GLOBAL_SERVICE.post(
        "/api/v1/m/wishlist/add",
        { bookId: curBook.bookId }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      refetchMemberWishList();
      toast.success("Added to wishlist!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Please try again!");
      // console.log(error.config.headers.Authorization);
      // console.log(error.config.headers["Authorization"]);
    }
  };

  return (
    <div className="max-w-sm overflow-hidden mb-3 transition-transform duration-300 group hover:-translate-y-1">
      <div className="pb-2 cursor-pointer overflow-hidden" onClick={specificBookDetails}>
        <img
          src={`${BACKEND_SERVER_BASE_URL}${imageURL}`}
          alt="Book img"
          className="aspect-[10/16] object-cover drop-shadow-md group-hover:scale-105 duration-500"
          priority="true"
        />
        <h2 className="text-base font-bold line-clamp-1 mt-2">{title}</h2>
        <p className="text-gray-600 text-base">by {author}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-center items-center w-full">
          {memberWishList?.data?.userWishLists?.some(
            (wishlistBook) => wishlistBook.book?.bookId === curBook?.bookId
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
  );
};

export default BookCard;
