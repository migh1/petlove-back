import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export default instance;
