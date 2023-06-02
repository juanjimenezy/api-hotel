import axios from 'axios';

export const getReservas=async(token)=> await axios.get('http://localhost:8080/reservas',{headers: {'Authorization': `Bearer ${token}`}});
export const eliminarReserva = async(id,token) => await axios.delete(`http://localhost:8080/reserva/${id}`,{headers: {'Authorization': `Bearer ${token}`}});
export const crearReserva = async (token,reserva) => await axios.post(`http://localhost:8080/reserva`,reserva,{headers: {'Authorization': `Bearer ${token}`}});
export const editarReserva = async (id,token,reserva) => await axios.put(`http://localhost:8080/reserva/${id}`,reserva,{headers: {'Authorization': `Bearer ${token}`}});