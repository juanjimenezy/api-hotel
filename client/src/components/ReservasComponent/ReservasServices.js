import axios from 'axios';

export const getReservas=async(token)=> 
await axios.get('http://localhost:8080/reservas',{headers: {'Authorization': `Bearer ${token}`}})