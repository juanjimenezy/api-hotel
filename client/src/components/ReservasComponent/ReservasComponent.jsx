import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getReservas } from './ReservasServices';

export const ReservasComponent = () => {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getDatos(token);
        } else {
            navigate('/');
        }
    }, []);

    const getDatos = async (token) => {
        const response = await getReservas(token);
        setReservas(response.data);
    }

    return (
        <div className='my-2 text-center'>
            <Container>
                <div className='my-5 text-center'>
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>id habitacion</th>
                                <th>nombre cliente</th>
                                <th>telefono cliente</th>
                                <th>fecha reserva</th>
                                <th>fecha entrada</th>
                                <th>fecha salida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((dato, key) =>
                                <tr key={key}>
                                    <td>{dato.id}</td>
                                    <td>{dato.id_habitacion}</td>
                                    <td>{dato.nombre_cli}</td>
                                    <td>{dato.telefono_cli}</td>
                                    <td>{dato.fecha_reserva || 'dd/mm/YYYY'}</td>
                                    <td>{dato.fecha_entrada}</td>
                                    <td>{dato.fecha_salida}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

            </Container>
        </div>
    )
}
