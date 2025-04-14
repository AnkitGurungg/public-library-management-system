// import Login from "@/features/User/Login/Login";
// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { ShoppingCart } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { useFetchBooks } from "@/hooks/useFetchBooks";
// import HoverCategories from "@/features/User/Home/HoverCategories";
// import ProfilePopover from "@/features/User/Profiile/ProfilePopover";
// import { useContext } from "react";
// import { UserContext } from "@/contexts/UserContext";

// const UHeader = () => {
//   const { token, setToken, loading, userInfo, getUserInfo } =
//     useContext(UserContext);
//   // const { data: books, refetch: refetchBooks } = useFetchBooks();

//   useEffect(() => {
//     setToken(localStorage.getItem("Authorization"));
//   }, []);

//   useEffect(() => {
//     // getUserInfo();
//     refetchBooks();
//   }, []);

//   useEffect(() => {
//     if (userInfo && Object.keys(userInfo).length > 0) {
//       console.log("Updated user info:", userInfo);
//     }
//   }, [userInfo]);

//   const { data: books, refetch: refetchBooks } = useFetchBooks();

//   const [filteredBooks, setFilteredBooks] = useState([]);

//   const handleSearch = (value) => {
//     const lowerValue = value.toLowerCase();
//     const result = books.data.filter((book) =>
//       book.title.toLowerCase().includes(lowerValue)
//     );
//     setFilteredBooks(result);
//   };
//   console.log(filteredBooks);

//   return (
//     <div className="z-50 fixed w-full">
//       <div className="h-[4.5rem] bg-white flex flex-row justify-around items-center drop-shadow-sm w-full">
//         <div className="flex flex-row gap-4 items-center">
//           <NavLink to="/">
//             <h1 className="font-medium text-[17px]">Booksmandala</h1>
//           </NavLink>
//           <div>
//             <HoverCategories className="w-[329px] h-[378px]" />
//           </div>
//         </div>
//         <div>
//           <Input
//             placeholder="What do you want to read?"
//             className="w-72 h-10 bg-[#f1f1f1]"
//             onChange={(e) => handleSearch(e.target.value)}
//           />
//         </div>

//         {
//           filteredBooks.length > 0 && (
//             <div>
//             {
//               filteredBooks.map((filterBook) => (
//                 <div>
//                   <img src={} alt="" />
//                   <p>name</p>
//                   <p>author name</p>
//                 </div>
//               ))
//           }
//             </div>
//           )
//           }

//         <div className="flex flex-row items-center gap-5">
//           <div></div>

//           {Object.keys(userInfo).length === 0 && <Login />}
//           {userInfo?.role === "ROLE_MEMBER" && (
//             <>
//               <NavLink to="/member/profile/wish-list">
//                 <ShoppingCart />
//               </NavLink>
//               <ProfilePopover />
//             </>
//           )}

//           {/* {userInfo &&
//             Object.keys(userInfo).length > 0 &&
//             userInfo?.role === "ROLE_MEMBER" && (
//               <NavLink to="/member/profile/wish-list">
//                 <ShoppingCart />
//               </NavLink>
//             )}
//           {userInfo === null && <Login />}

//           {userInfo &&
//             Object.keys(userInfo).length > 0 &&
//             userInfo?.role === "ROLE_MEMBER" && <ProfilePopover />
//           } */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UHeader;

import Login from "@/features/User/Login/Login";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Bookmark, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFetchBooks } from "@/hooks/useFetchBooks";
import HoverCategories from "@/features/User/Home/HoverCategories";
import ProfilePopover from "@/features/User/Profiile/ProfilePopover";
import { UserContext } from "@/contexts/UserContext";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";
import { Button } from "@/components/ui/button";

const UHeader = () => {
  const {
    token,
    setToken,
    loading,
    userInfo = {},
    getUserInfo,
  } = useContext(UserContext); // Default userInfo to {}
  const { data: books, refetch: refetchBooks } = useFetchBooks();
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

  return (
    <>
      <Login isOpenLogin={isOpenLogin} setIsOpenLogin={setIsOpenLogin} />
      
      <div className="z-50 fixed w-full">
        <div className="h-[4.5rem] bg-white flex flex-row justify-around items-center drop-shadow-sm w-full px-4">
          <div className="flex flex-row gap-4 items-center relative">
            <NavLink to="/">
              <h1 className="font-medium text-[17px]">Booksmandala</h1>
            </NavLink>
            <HoverCategories className="w-[329px] h-[378px]" />
          </div>

          <div className="relative w-96">
            <Input
              placeholder="What do you want to read?"
              className="w-full h-11 bg-[#f1f1f1] rounded-md border-none px-3 p-2"
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              onFocus={() => {
                if (filteredBooks.length > 0) setShowDropdown(true);
              }}
            />

            {showDropdown && filteredBooks.length > 0 && (
              <div className="absolute topтє12 left-0 w-full max-h-72 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-md z-50">
                {filteredBooks.map((book) => (
                  <NavLink
                    to={`/books/book/${book.bookId}`}
                    key={book.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={
                        `${BACKEND_SERVER_BASE_URL}${book.imageURL}` ||
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

          <div className="flex flex-row items-center gap-5">
            {/* {userInfo && Object.keys(userInfo).length === 0 && <Login />} */}

            {/* {(!userInfo ||
            Object.keys(userInfo).length === 0 ||
            !userInfo.present ||
            !userInfo.active) && <Login />} */}

            {(!userInfo ||
              Object.keys(userInfo).length === 0 ||
              !userInfo.present ||
              !userInfo.active) && (
              <div>
                <Button variant="none" onClick={() => setIsOpenLogin(true)}>
                  Login
                </Button>
              </div>
            )}

            {userInfo.role === "ROLE_MEMBER" &&
              userInfo?.active &&
              userInfo?.present && (
                <>
                  <NavLink to="/member/profile/wish-list">
                    <Bookmark />
                  </NavLink>
                  <ProfilePopover />
                </>
              )}
            {(userInfo?.role === "ROLE_ADMIN" ||
              userInfo?.role === "ROLE_LIBRARIAN") && (
              <button
                onClick={() => {
                  if (userInfo.role === "ROLE_ADMIN") {
                    navigate("/admin");
                    window.location.href = "/admin";
                  } else if (userInfo.role === "ROLE_LIBRARIAN") {
                    navigate("/librarian");
                  }
                }}
                className="text-[#206ea6] cursor-pointer"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UHeader;
