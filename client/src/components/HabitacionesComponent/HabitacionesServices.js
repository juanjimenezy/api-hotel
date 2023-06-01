import axios from 'axios';

export const getHabitaciones=async(token)=> 
await axios.get('http://localhost:8080/habitaciones',{headers: {'Authorization': `Bearer ${token}`}});


export const eliminarHabitacion = async(id,token) =>
await axios.delete(`http://localhost:8080/habitacion/${id}`,{headers: {'Authorization': `Bearer ${token}`}});