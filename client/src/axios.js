import axios from "axios";

let token;
if (localStorage.userAuth) {
  token = localStorage.userAuth;
}

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "x-access-token": token,
    "Content-Type": "application/json"
  }
});

export default instance;
