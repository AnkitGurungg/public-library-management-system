import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/book/",
})

export const getBook = () => {
    return (
        api.get("get/:id")
    )
}

export const getBooks = () => {
    return (
        api.get("get/all")
    )
}

export const addBook = () => {
    return (
        api.get("add")
    )
}

export const deleteBook = () => {
    return (
        api.get("delete/:id")
    )
}