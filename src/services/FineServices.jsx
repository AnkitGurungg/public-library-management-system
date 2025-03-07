import axios from "axios";

const FineAPI = axios.create({
    baseURL: "http://localhost:8080/api/fine/",
})

export default FineAPI