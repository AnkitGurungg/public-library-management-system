import Login from "@/features/User/Login/Login";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import HoverCategories from "@/features/User/Home/HoverCategories";
import ProfilePopover from "@/features/User/Profiile/ProfilePopover";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const UHeader = () => {
  const { token, setToken, loading, userInfo, getUserInfo } =
    useContext(UserContext);
  const { data: books, refetch: refetchBooks } = useFetchBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
  }, []);

  useEffect(() => {
    // getUserInfo();
    refetchBooks();
    setAllBooks(books?.data);
  }, []);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      console.log("Updated user info:", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (books?.data) {
      setAllBooks(books.data);
    }
  }, [books]);

  // const searchedBooks = allBooks.filter((book) => {
  //   const matchesSearch = book.title
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  //   return matchesSearch;
  //   // return book.title.toLowerCase().includes(searchQuery.toLowerCase());
  // });

  return (
    <div className="sticky top-0 z-50">
      <div className="h-[4.5rem] bg-white flex flex-row justify-around items-center drop-shadow-sm w-full">
        <div className="flex flex-row gap-4 items-center">
          <NavLink to="/">
            <h1 className="font-medium text-[17px]">Booksmandala</h1>
          </NavLink>
          <div>
            <HoverCategories className="w-[329px] h-[378px]" />
          </div>
        </div>
        <div>
          <Input
            placeholder="What do you want to read?"
            className="w-72 h-10 bg-[#f1f1f1]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center gap-5">
          <div></div>

          {Object.keys(userInfo).length === 0 && <Login />}
          {userInfo?.role === "ROLE_MEMBER" && (
            <>
              <NavLink to="/member/profile/wish-list">
                <ShoppingCart />
              </NavLink>
              <ProfilePopover />
            </>
          )}

          {/* {userInfo &&
            Object.keys(userInfo).length > 0 &&
            userInfo?.role === "ROLE_MEMBER" && (
              <NavLink to="/member/profile/wish-list">
                <ShoppingCart />
              </NavLink>
            )}
          {userInfo === null && <Login />}

          {userInfo &&
            Object.keys(userInfo).length > 0 &&
            userInfo?.role === "ROLE_MEMBER" && <ProfilePopover />
          } */}
        </div>
      </div>
    </div>
  );
};

export default UHeader;
