import axios from "axios";

export const API_URL = 'http://localhost:3000/';

export function defaultConfig() {
  return {
    headers: {
      "Content-Type": "application/json",
      "token": sessionStorage.getItem('token'),
    },
  };
}

export function handleErrorApi(error) {
  alert("Erro");
  console.log(error);
}


axios.interceptors.request.use(function (config) {
  document.body.classList.add('loading-indicator');
  return config
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  document.body.classList.remove('loading-indicator');
  return response;
}, function (error) {
  return Promise.reject(error);
});