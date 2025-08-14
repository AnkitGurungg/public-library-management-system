import Login from "@/features/User/Login/Login";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Bookmark, GaugeCircle, Heart, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import HoverCategories from "@/features/User/Home/HoverCategories";
import ProfilePopover from "@/features/User/Profiile/ProfilePopover";
import { UserContext } from "@/contexts/UserContext";
import { S3_BASE_URL } from "@/services/GlobalServices";
import { Button } from "@/components/ui/button";
import { useFetchAllAvailableBooks } from "@/hooks/useFetchAllAvailableBooks";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const UHeader = () => {
  const { token, setToken, loading, userInfo, getUserInfo } =
    useContext(UserContext);
  const { data: books, refetch: refetchBooks } = useFetchAllAvailableBooks();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
  }, []);

  useEffect(() => {
    refetchBooks();
  }, []);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      console.log("Updated user info:", userInfo);
    }
  }, [userInfo]);

  const handleSearch = (value) => {
    if (!value.trim()) {
      setFilteredBooks([]);
      setShowDropdown(false);
      return;
    }

    const lowerValue = value.toLowerCase();
    const result = Array.isArray(books?.data)
      ? books?.data?.filter((book) =>
          book.title.toLowerCase().includes(lowerValue)
        )
      : [];
    setFilteredBooks(result);
    setShowDropdown(true);
  };

  const handleWishlistClick = () => {
    if (userInfo?.active && userInfo?.present) {
      navigate("/member/profile/wish-list");
    } else {
      toast.error("Please login!");
    }
  };

  return (
    <>
      <Login isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} />

      <div className="z-50 fixed w-full">
        <div className="h-[4.5rem] bg-white flex flex-row justify-around items-center drop-shadow-sm w-full px-4">
          <div className="flex flex-row gap-7 items-center relative mr-10">
            <NavLink to="/">
              <img src="/logo/logo.png" className="object-cover w-48 h-7"></img>
            </NavLink>
            <HoverCategories className="w-[329px] h-[378px]" />
          </div>

          <div className="relative w-96 mr-20">
            <Input
              placeholder="What do you want to read?"
              className="w-full h-11 bg-[#f1f1f1] rounded-md border-none px-3 p-2 placeholder:text-gray-500 placeholder:text-sm placeholder:font-medium"
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              onFocus={() => {
                if (filteredBooks.length > 0) setShowDropdown(true);
              }}
            />

            {showDropdown && filteredBooks.length > 0 && (
              <div className="absolute top-12 left-0 w-full max-h-72 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {filteredBooks.map((book) => (
                  <NavLink
                    to={`/books/book/${book.bookId}`}
                    key={book.bookId}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={
                        `${S3_BASE_URL}/${book.imageURL}` ||
                        "/placeholder-book.png"
                      }
                      alt={book.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-row items-center gap-4">
            <div onClick={handleWishlistClick} className="cursor-pointer">
              <Heart />
            </div>

            {/* {(!userInfo ||
              Object.keys(userInfo).length === 0 ||
              !userInfo?.present ||
              !userInfo?.active) && (
              <div>
                <Button
                  variant="none"
                  onClick={() => setIsOpenLogin(true)}
                  className="text-[17px] cursor-pointer"
                >
                  Login
                </Button>
              </div>
            )}
            {userInfo?.active && userInfo?.present && (
              <>
                <ProfilePopover />
              </>
            )} */}
            {loading ? (
              <CgSpinner className="animate-spin text-2xl text-gray-600" />
            ) : userInfo?.active && userInfo?.present ? (
              <ProfilePopover />
            ) : (
              <Button
                variant="none"
                onClick={() => setIsOpenLogin(true)}
                className="text-[17px] cursor-pointer"
              >
                Login
              </Button>
            )}

            {(userInfo?.role === "ROLE_ADMIN" ||
              userInfo?.role === "ROLE_LIBRARIAN") && (
              <button
                onClick={() => {
                  if (userInfo?.role === "ROLE_ADMIN") {
                    navigate("/admin");
                    window.location.href = "/admin";
                  } else if (userInfo?.role === "ROLE_LIBRARIAN") {
                    navigate("/librarian");
                  }
                }}
                className="text-black cursor-pointer"
              >
                <GaugeCircle />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UHeader;
