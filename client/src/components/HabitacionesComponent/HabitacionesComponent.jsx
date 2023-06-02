import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Card, CardBody, CardHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getHabitaciones, eliminarHabitacion, editarHabitacion } from './HabitacionesServices';

export const HabitacionesComponent = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [modal, setModal] = useState(false);
    const [registro, setRegistro] = useState({ id: "", numero: "", tipo: "", valor: 0 });
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
            await eliminarHabitacion(id, token);
            await getDatos(token);
        }
    };

    const handleChange = async (e) => {
        if (modal) setRegistro({ ...registro, [e.target.name]: e.target.value, });
    };

    const modalShowHide = async (dato) => {
        setModal(!modal);
        if (dato === null) setRegistro({ id: "", numero: "", tipo: "", valor: 0 });
    }

    const editar = async (dato) => {
        setRegistro(dato);
        modalShowHide("b");
    }

    const guardar = async (dato) => {
        if (dato.id) {
            const token = localStorage.getItem('token');
            await editarHabitacion(dato.id, token, dato);
            await getDatos(token);
            modalShowHide("b");
        }
        
    }

    const closeBtn = (
        <button className="close" onClick={() => modalShowHide(null)} type="button">
            &times;
        </button>
    );

    return (
        <>
            <div >
                <Container>
                    <div className='my-5 text-center'>
                        <Card>
                            <CardHeader>
                                <h2>Habitaciones</h2>
                                <div style={{ textAlign: 'left' }}>
                                    <Button color='success' onClick={() => modalShowHide(null)}>Nuevo Registro</Button>
                                </div>

                            </CardHeader>
                            <CardBody>
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
                                                <td><Button className="btn-sm" color='secondary' onClick={() => editar(dato)}><i className="bi bi-pencil-square"></i></Button>
                                                    {" "}
                                                    <Button className="btn-sm" color='danger' onClick={() => eliminarH(dato.id)} ><i className="bi bi-trash"></i></Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>

                    </div>
                </Container>
            </div>
            <Modal isOpen={modal} className=''>
                <ModalHeader close={closeBtn}>
                    {registro.id === "" ? <p>Nuevo Registro</p> : <p>Editar Registro</p>}
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>id:</label>
                        <input className="form-control" name="id" type="text" onChange={handleChange} value={registro.id} disabled />
                    </FormGroup>
                    <FormGroup>
                        <label>Numero:</label>
                        <input className="form-control" name="numero" type="number" onChange={handleChange} value={registro.numero} required />
                    </FormGroup>
                    <FormGroup>
                        <label>Tipo: </label>
                        <select name="tipo" className='form-select' onChange={handleChange} value={registro.tipo} required>
                            <option value="">Seleccionar ...</option>
                            <option value="INDIVIDUAL">CAMA INDIVIDUAL</option>
                            <option value="DOBLE" selected>CAMA DOBLE</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>Valor:</label>
                        <input className="form-control" name="valor" type="number" onChange={handleChange} value={registro.valor} required />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="success" onClick={() => guardar(registro)} ><i className="bi bi-check-lg"></i></Button>
                </ModalFooter>

            </Modal>
        </>
    )
}
