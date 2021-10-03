import axios from 'axios';
import { API_URL } from './Config'

class TokenService {

  validateToken(dados) {
    return axios.post(API_URL + 'validar_token', dados);
  }

  generateToken(dados) {
    return axios.post(API_URL + 'gerar_token', dados);
  }

  login(dados) {
    return axios.post(API_URL + 'logar', dados);
  }

}

export default new TokenService();