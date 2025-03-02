import { Outlet } from "react-router-dom"
import UserHeader from "./UserHeader"

const UserAppLayout = () => {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  )
}

export default UserAppLayout