import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getHabitaciones } from './HabitacionesServices';

export const HabitacionesComponent = () => {
    const [habitaciones, setHabitaciones] = useState([]);
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
        const response = await getHabitaciones(token);
        setHabitaciones(response.data);
    }

    return (
        <div className='my-2 text-center'>
            <Container>
                <div className='my-5 text-center'>
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>numero</th>
                                <th>tipo</th>
                                <th>valor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {habitaciones.map((dato, key) =>
                                <tr key={key}>
                                    <td>{dato.id}</td>
                                    <td>{dato.numero}</td>
                                    <td>{dato.tipo}</td>
                                    <td>{dato.valor}</td>
                                    <td>{dato.fecha}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

            </Container>
        </div>

    )
}
