import axios from 'axios';

export const getHabitaciones = async (token) => await axios.get('http://localhost:8080/habitaciones', { headers: { 'Authorization': `Bearer ${token}` } });
export const eliminarHabitacion = async (id, token) => await axios.delete(`http://localhost:8080/habitacion/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
export const crearHabitacion = async (token,habitacion) => await axios.post(`http://localhost:8080/habitacion`,habitacion, { headers: { 'Authorization': `Bearer ${token}` } });

export const editarHabitacion = async (id, token, habitacion) => {
    console.log(habitacion);
    const options = {
        method: 'PUT',
        url: `http://localhost:8080/habitacion/${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer :${token}`,
        },
        data: {
            "numero": habitacion.numero,
            "tipo": habitacion.tipo,
            "valor": habitacion.valor
        },

    };
    await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
};