import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Card, CardBody, CardHeader, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getReservas, eliminarReserva,crearReserva,editarReserva } from './ReservasServices';
import moment from 'moment';

export const ReservasComponent = () => {
    const [reservas, setReservas] = useState([]);
    const [modal, setModal] = useState(false);
    const [error, setError] = useState({ error: false, messageError: "" });
    const [registro, setRegistro] = useState({ id: "", id_habitacion: "", nombre_cliente: "", telefono_cliente: "", fecha_reserva: "", fecha_entrada: "", fecha_salida: "" });
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
            await eliminarReserva(id, token);
            await getDatos(token);
        }
    };

    const editar = async (dato) => {
        setRegistro(dato);
        modalShowHide("b");
    }

    const modalShowHide = async (dato) => {
        setModal(!modal);
        setError({ error: false, messageError: "" });
        if (dato === null) setRegistro({ id: "", id_habitacion: "", nombre_cli: "", telefono_cli: "", fecha_reserva: "", fecha_entrada: "", fecha_salida: "" });
    };

    const handleChange = async (e) => {
        if (modal) setRegistro({ ...registro, [e.target.name]: e.target.value, });
    };

    const guardar = async (dato) => {
        if (validateData(dato)) {
            var token = localStorage.getItem('token');
            if (dato.id) {
                dato.fecha_reserva = moment(dato.reserva).format('YYYY-MM-DD')
                dato.fecha_entrada = moment(dato.fecha_entrada).format('YYYY-MM-DD');
                dato.fecha_salida = moment(dato.salida).format('YYYY-MM-DD')
                await editarReserva(dato.id, token, dato);
                await getDatos(token);
                modalShowHide("b");
            } else {
                await crearReserva(token, dato);
                await getDatos(token);
                modalShowHide("b");
            }
        }
    };

    const validateData = (data) => {
        if (!data.id_habitacion) {
            setError({error:true ,messageError:"Numero de habitacion requerido!"});
            return false;
        }
        if (!data.nombre_cli) {
            setError({error:true ,messageError:"Nombre cliente requerido!"});
            return false;
        }
        if (!data.telefono_cli) {
            setError({error:true ,messageError:"Telefono del cliente requerido!"});
            return false;
        }
        if (!data.fecha_reserva) {
            setError({error:true ,messageError:"Fecha de reserva requerido!"});
            return false;
        }
        if (!data.fecha_entrada) {
            setError({error:true ,messageError:"Fecha de entrada requerido!"});
            return false;
        }
        if (!data.fecha_salida) {
            setError({error:true ,messageError:"Fecha de salida requerido!"});
            return false;
        }
        return true;
    }

    const closeBtn = (
        <button className="close" onClick={() => modalShowHide(null)} type="button">
            &times;
        </button>
    );

    return (
        <>
            <div className='my-2 text-center'>
                <Container>
                    <div className='my-5 text-center'>
                        <Card>
                            <CardHeader>
                                <h2>Reservas</h2>
                                <div style={{ textAlign: 'left' }}>
                                    <Button color='success' onClick={() => modalShowHide(null)}>Nueva Reserva</Button>
                                </div>
                            </CardHeader>
                            {reservas.length > 0?
                            <CardBody>
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
                                                <td>{moment(dato.fecha_reserva).format('YYYY-MM-DD')}</td>
                                                <td>{moment(dato.fecha_entrada).format('YYYY-MM-DD')}</td>
                                                <td>{moment(dato.fecha_salida).format('YYYY-MM-DD')}</td>
                                                <td><Button className="btn-sm" color='secondary' onClick={() => editar(dato)}><i className="bi bi-pencil-square"></i></Button>
                                                    {" "}
                                                    <Button className="btn-sm" color='danger' onClick={() => eliminarR(dato.id)}><i className="bi bi-trash"></i></Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                            :<div className='alert alert-warning'>No hay reservas creadas</div>}
                        </Card>
                    </div>
                </Container>
            </div>

            <Modal isOpen={modal} className=''>
                <ModalHeader close={closeBtn}>
                    {registro.id === "" ? <p>Nuevo Registro</p> : <p>Editar Registro</p>}
                </ModalHeader>
                {error.error === true ? <div className="alert alert-danger" role="alert">{error.messageError}</div> : <></>}
                <ModalBody>
                    <FormGroup>
                        <label>id:</label>
                        <input className="form-control" name="id" type="text" onChange={handleChange} value={registro.id} disabled />
                    </FormGroup>
                    <FormGroup>
                        <label>id habitacion:</label>
                        <input className="form-control" name="id_habitacion" type="number" onChange={handleChange} value={registro.id_habitacion} required />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre Cliente:</label>
                        <input className="form-control" name="nombre_cli" type="text" onChange={handleChange} value={registro.nombre_cli} required />
                    </FormGroup>
                    <FormGroup>
                        <label>Telefono Cliente:</label>
                        <input className="form-control" name="telefono_cli" type="number" onChange={handleChange} value={registro.telefono_cli} required />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha Reserva:</label>
                        <input className="form-control" name="fecha_reserva" type="date" onChange={handleChange} value={moment(registro.fecha_reserva).format('YYYY-MM-DD')} required />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha entrada:</label>
                        <input className="form-control" name="fecha_entrada" type="date" onChange={handleChange} value={moment(registro.fecha_entrada).format('YYYY-MM-DD')} required />
                    </FormGroup>
                    <FormGroup>
                        <label>Fecha salida:</label>
                        <input className="form-control" name="fecha_salida" type="date" onChange={handleChange} value={moment(registro.fecha_salida).format('YYYY-MM-DD')} required />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => guardar(registro)} ><i className="bi bi-check-lg"></i></Button>
                </ModalFooter>

            </Modal>

        </>
    )
}
