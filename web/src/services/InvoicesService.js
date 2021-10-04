import axios from 'axios';
import { API_URL } from './Config'
import { defaultConfig } from './Config';

class InvoicesServices {

  listInvoices(data) {
    return axios.post(API_URL + 'invoices/listar', data, defaultConfig());
  }

  loadDetails(id) {
    return axios.post(API_URL + 'invoice/carregar', { id }, defaultConfig());
  }

  save(data, emails) {
    console.log(emails);
    const data_transform = {
      number: data["numberInvoice"],
      date: data["date"],
      company: data["company"],
      bill_to: data["billingFor"],
      total: data["total"],
      emails
    }
    return axios.post(API_URL + 'invoice/salvar', data_transform, defaultConfig());
  }

}

export default new InvoicesServices();