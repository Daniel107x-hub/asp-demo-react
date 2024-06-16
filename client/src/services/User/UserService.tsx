import axios from "axios";

const login = (email: String, password: String) => {
    return axios.post('https://localhost:5105/login?useCookies=true&useSessionCookies=true', { email, password});
}

const register  = (request: RegisterRequest) => {
    return axios.post('https://localhost:5105/register', request);
}

const verifyAuthentication = async () => {
    return axios.get('https://localhost:5105/manage/info', {withCredentials:true})
}

type RegisterRequest = {
    email: string,
    userName: string,
    password: string
}

export {
    login,
    register,
    verifyAuthentication
};