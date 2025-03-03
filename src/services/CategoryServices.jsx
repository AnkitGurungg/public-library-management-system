import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/category/",
})

const getCategory = () => {
    return (
        api.get("get/:id")
    )
}

const getCategories = () => {
    return (
        api.get("get/all")
    )
}

const addCategory = () => {
    return (
        api.get("add")
    )
}

const deleteCategory = () => {
    return (
        api.get("delete/:id")
    )
}

export default {getCategory, getCategories, addCategory, deleteCategory}