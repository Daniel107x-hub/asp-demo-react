import axios from "axios";

const login = (email: String, password: String) => {
    return axios.post('https://localhost:5105/login', { email, password });
}

const register  = (request: RegisterRequest) => {
    return axios.post('https://localhost:5105/register', request);
}

type RegisterRequest = {
    email: string,
    userName: string,
    password: string
}

export {
    login,
    register
};