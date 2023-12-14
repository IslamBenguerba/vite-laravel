// import axios from 'axios';
import { reactive } from 'vue'
import axios from "axios";
export const store = reactive({
    // data: [],
    // lista: '',
    // page: [],
    // currentPage: 1,
    // queryOfPerson: 'Avenger',
    // totalPage: '',
    nomeCocktail: ' ciao',
    toggleList: false,
    drinkView: null,
    currentPost: '',
    PrevLaunch() {
        return store.toggleList
    },
    currentUser: localStorage.user
})



const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})

axiosInstance.interceptors.request.use(req => {
    req.headers.Accept = 'application/json';
    req.headers['Content-Type'] = 'application/json';
    return req;
})
axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401 && err.response.data.message !== 'User not found') {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            window.location.href = '/login';
        }
        Promise.reject(err);
    }
    );
// store.currentuser è diverso da ''
if (store.currentUser != '') {
    const token = localStorage.token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default axiosInstance 