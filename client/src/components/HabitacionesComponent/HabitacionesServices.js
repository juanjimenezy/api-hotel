import axios from 'axios';

export const getHabitaciones=async(token)=> 
await axios.get('http://localhost:8080/habitaciones',{headers: {'Authorization': `Bearer ${token}`}})