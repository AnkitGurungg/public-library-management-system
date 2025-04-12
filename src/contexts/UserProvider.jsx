import GLOBAL_SERVICE from "@/services/GlobalServices";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

export function UserProvider({ children }) {
  // const [token, setToken] = useState(
  //   () => localStorage.getItem("Authorization") || ""
  // );

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/get-user",
          { jwtToken: `Bearer ${token}` }
          // {
          //   headers: {
          //     Authorization: token,
          //   },
          // }
        );
        setLoading(false);
        setUserInfo(response.data);
      } catch (error) {
        if (error.status === 404) {
          toast.success("User does not exist");
          localStorage.removeItem("Authorization");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("Authorization"));
    console.log("Token setted");
  }, []);

  useEffect(() => {
    console.log("Token changed");
    if (token) {
      getUserInfo();
    } else {
      setUserInfo({});
      setLoading(false);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        loading,
        userInfo,
        getUserInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
