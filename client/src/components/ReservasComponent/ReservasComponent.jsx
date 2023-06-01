import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getReservas,eliminarReserva } from './ReservasServices';

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

    const eliminarR = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            await eliminarReserva(id,token);
            await getDatos(token);
        }
    };

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
                                <th></th>
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
                                    <td><Button className="btn-sm" color='secondary' ><i className="bi bi-pencil-square"></i></Button>
                                        {" "}
                                        <Button className="btn-sm" color='danger' onClick={() => eliminarR(dato.id)}><i className="bi bi-trash"></i></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

            </Container>
        </div>
    )
}
