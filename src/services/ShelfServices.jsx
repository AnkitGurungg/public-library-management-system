import axios from "axios";

const ShelfAPI = axios.create({
    baseURL: "http://localhost:8080/api/shelf/",
})

export default ShelfAPI