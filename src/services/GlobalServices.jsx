import axios from "axios";

const GlobalService = axios.create({
    baseURL: "http://localhost:8080/"
})

export default GlobalService