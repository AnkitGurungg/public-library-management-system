import axios from "axios";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";
import { BACKEND_SERVER_BASE_URL } from "@/services/GlobalServices";

export function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("Authorization"));
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    if (token) {
      try {
        const response = await axios.get(`${BACKEND_SERVER_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        if (error.status === 404) {
          toast.success("User does not exist");
          localStorage.removeItem("Authorization");
        }
      } finally {
        setLoading(false);
        console.log(userInfo);
      }
    }
  };

  useEffect(() => {
    if (token) {
      getUserInfo();
    } else {
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
