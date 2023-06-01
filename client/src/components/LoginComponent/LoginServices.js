
import axios from 'axios';

export const getToken=async(login)=> 
await axios.post('http://localhost:8080/login',login)