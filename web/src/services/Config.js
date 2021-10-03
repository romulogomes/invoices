export const API_URL = 'http://localhost:3000/';

export function defaultConfig() {
  return {
    headers: {
      "Content-Type": "application/json",
      "token": sessionStorage.getItem('token'),
    },
  };
}