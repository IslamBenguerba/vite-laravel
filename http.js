import axios from "axios";

const axiosInstance = axios.create({
    withCredentials: true
})

axiosInstance.interceptors.request.use(req => {
    req.headers.common['Accept'] = 'application/json';
    req.headers.common['Content-Type'] = 'application/json';
    return req;
})