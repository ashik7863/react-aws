import axios from 'axios';

const ApiClient = axios.create({
  baseURL: 'http://localhost:4500/api',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
});

export default ApiClient;
