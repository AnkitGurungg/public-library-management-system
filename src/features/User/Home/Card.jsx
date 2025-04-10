import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/UserContext";
import { useEffect } from "react";
import GLOBAL_SERVICE from "@/services/GlobalServices";

const Card = ({ curBook }) => {
  const navigate = useNavigate();
  const { token, setToken, userInfo } = useContext(UserContext);
  const { imageURL, title, author } = curBook;

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
  }, []);

  const specificBookDetails = () => {
    navigate(`/books/book/${curBook.bookId}`);
  };

  // ✅ Updated to include role check
  const handleAddToWishlist = async (e) => {
    e.stopPropagation(); // Prevent navigation on button click

    if (!token) {
      alert("Please log in to add books to your wishlist.");
      return;
    }

    if (userInfo?.role !== "ROLE_MEMBER") {
      alert("Only members are allowed to add books to the wishlist.");
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
      alert("Book added to wishlist!");
      console.log(response.data);
    } catch (error) {
      console.log(error.config.headers.Authorization);
      console.log(error.config.headers["Authorization"]);
      console.error("Error adding to wishlist:", error);
      alert("Failed to add to wishlist. Please try again.");
    }
  };

  return (
    <div
      className="w-54 h-100 bg-[#f1f1f1] cursor-pointer"
      onClick={specificBookDetails}
    >
      <div>
        <img src={`http://localhost:8080/${imageURL}`} alt="Book img" />
      </div>
      <div>
        <p>{title}</p>
        <p>{author}</p>
      </div>
      <div className="flex justify-center items-center w-full pl-2 pr-2">
        <Button
          onClick={handleAddToWishlist}
          className="w-full bg-white border-1 border-[#9cc2ff] text-[#206ea6] uppercase hover:bg-[#206ea6] hover:text-white"
        >
          Add to WishList
        </Button>
      </div>
    </div>
  );
};

export default Card;
