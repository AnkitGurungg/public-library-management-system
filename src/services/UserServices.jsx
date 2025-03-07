import axios from "axios";

const UserAPI = axios.create({
    baseURL: "http://localhost:8080/api/user/",
})

export default UserAPI