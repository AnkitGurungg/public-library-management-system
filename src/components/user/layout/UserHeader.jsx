import Login from "../modals/Login"
import Register from "../modals/Register"

const UserHeader = () => {
  return (
    <div>
      <h1>User Header</h1>
      <Register />
      <Login />
    </div>
  )
}

export default UserHeader