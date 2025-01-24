import axios from "axios";

const http = axios.create({

  //baseURL: "http://localhost:3000",
  baseURL:"https://back-aprofunda-03.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});


export default http;
