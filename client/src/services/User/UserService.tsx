import axios from "axios";

axios.defaults.withCredentials = true;

const login = (email: String, password: String) => {
    return axios.post('https://localhost:5105/login?useCookies=true&useSessionCookies=true', { email, password, withCredentials:false});
}

const logout = () => {
    return axios.post('https://localhost:5105/logout', {});
}

const register  = (request: RegisterRequest) => {
    return axios.post('https://localhost:5105/register', request);
}

const verifyAuthentication = async () => {
    return axios.get('https://localhost:5105/manage/info')
}

type RegisterRequest = {
    email: string,
    userName: string,
    password: string
}

export {
    login,
    register,
    verifyAuthentication,
    logout
};