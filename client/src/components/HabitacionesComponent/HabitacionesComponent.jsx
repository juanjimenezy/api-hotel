import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getHabitaciones,eliminarHabitacion } from './HabitacionesServices';

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

    const eliminarH = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            await eliminarHabitacion(id,token);
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
                                    <td><Button className="btn-sm" color='secondary' ><i className="bi bi-pencil-square"></i></Button>
                                        {" "}
                                        <Button className="btn-sm" color='danger' onClick={() => eliminarH(dato.id)} ><i className="bi bi-trash"></i></Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>

            </Container>
        </div>

    )
}
