import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/book/",
})

export const getFine = () => {
    return (
        api.get("/api/fine")
    )
}