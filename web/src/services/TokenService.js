import axios from 'axios';
import { API_URL } from './Config'

class TokenService {

  validateToken(data) {
    return axios.post(API_URL + 'validar_token', data);
  }

  generateToken(data) {
    return axios.post(API_URL + 'gerar_token', data);
  }

  login(data) {
    return axios.post(API_URL + 'logar', data);
  }

}

export default new TokenService();