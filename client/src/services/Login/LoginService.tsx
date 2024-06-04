import axios from "axios";

const login = (email: String, password: String) => {
    return axios.post('http://localhost:5104/login', { email, password });
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //     if (email === 'admin' && password === 'admin') {
    //         resolve({ email, password });
    //     } else {
    //         reject('Invalid email or password');
    //     }
    //     }, 1000);
    // });
}

export {login};