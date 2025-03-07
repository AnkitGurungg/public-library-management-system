import axios from "axios";

const BookAPI = axios.create({
    baseURL: "http://localhost:8080/api/book/",
})

export default BookAPI