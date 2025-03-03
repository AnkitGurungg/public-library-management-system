import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/shelf/",
})

export const getShelf = () => {
    return (
        api.get("get/:id")
    )
}

export const getShelfs = () => {
    return (
        api.get("get/all")
    )
}

export const addShelf = () => {
    return (
        api.get("add")
    )
}

export const deleteShelf = () => {
    return (
        api.get("delete/:id")
    )
}

export default {getShelf, getShelfs, addShelf, deleteShelf}