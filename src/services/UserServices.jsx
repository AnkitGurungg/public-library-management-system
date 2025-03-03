import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/user/",
})

const getUser = () => {
    return (
        api.get("get/:id")
    )
}

const getUsers = () => {
    return (
        api.get("get/all")
    )
}

const registerMemberUser = () => {
    return (
        api.get("register")
    )
}

const addLibrarianUser = () => {
    return (
        api.get("/add/librarian")
    )
}

const deleteUser = () => {
    return (
        api.get("/api/user/delete/:id")
    )
}

export default {getUser, getUsers, registerMemberUser, addLibrarianUser, deleteUser}