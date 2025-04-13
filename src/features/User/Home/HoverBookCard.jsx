import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UserContext } from "@/contexts/UserContext";
import { useFetchMemberWishList } from "@/hooks/useFetchMemberWishList";
import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HoverBookCard = ({ curBook }) => {
  const navigate = useNavigate();
  const { token, setToken, userInfo } = useContext(UserContext);
  const { imageURL, title, author } = curBook;
  const { data: memberWishList, refetch: refetchMemberWishList } =
    useFetchMemberWishList();

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
  }, []);

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
      //   console.log(error.config.headers.Authorization);
      //   console.log(error.config.headers["Authorization"]);
    }
  };

  return (
    <Card className="group w-full max-w-[320px] h-[480px] shadow-none border-none transition-all duration-0 hover:shadow-lg hover:drop-shadow-lg hover:border hover:border-gray-200 hover:rounded-lg hover:bg-white py-0 button-add">
      <div
        className="relative flex justify-center items-center"
        style={{ height: "300px" }}
        onClick={specificBookDetails}
      >
        <img
          src={
            imageURL
              ? `${BACKEND_SERVER_BASE_URL}${imageURL}`
              : "/placeholder.svg"
          }
          alt="One two"
          className="object-contain max-h-full aspect-[9/16] px-1.5 mt-0 pt-1.5"
        />
      </div>
      <CardContent className="pt-0 py-0">
        <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
        <p className="text-gray-500 line-clamp-1 text-base">by {author}</p>
      </CardContent>
      <CardFooter className="pb-4 mt-auto">
        {memberWishList?.data?.userWishLists?.some(
          (wishlistBook) => wishlistBook.book?.bookId === curBook?.bookId
        ) ? (
          <Button
            onClick={() => navigate("/member/profile/wish-list")}
            className="w-full text-white bg-[#206ea6]  border-[#206ea6] border-1 uppercase hover:text-[#206ea6] hover:bg-white rounded-none"
          >
            View WishList
          </Button>
        ) : (
          <Button
            onClick={handleAddToWishlist}
            className="group-hover:bg-[#206ea6] group-hover:text-white w-full text-[#206ea6] bg-white border-1 border-[#206ea6] hover:bg-[#206ea6] rounded-none uppercase"
          >
            Add to WishList
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default HoverBookCard;
