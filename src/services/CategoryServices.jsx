import axios from "axios";

const CategoryAPI = axios.create({
    baseURL: "http://localhost:8080/api/category/",
})

export default CategoryAPI