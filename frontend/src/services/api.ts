import axios from 'axios';


export const api = axios.create({
  baseURL: 'http://localhost:3000', // ton backend NestJS
  withCredentials: true, // pour envoyer les cookies HTTP-only
});
