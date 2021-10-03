import axios from 'axios';
import { API_URL } from './Config'
import { defaultConfig } from './Config';

class InvoicesServices {

  listar(dados) {
    return axios.post(API_URL + 'invoices/listar', dados, defaultConfig());
  }

}

export default new InvoicesServices();