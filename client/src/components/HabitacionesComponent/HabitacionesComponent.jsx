import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Card, CardBody, CardHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getHabitaciones, eliminarHabitacion, editarHabitacion, crearHabitacion } from './HabitacionesServices';
import numeral from 'numeral';

export const HabitacionesComponent = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [modal, setModal] = useState(false);
    const [registro, setRegistro] = useState({ id: "", numero: "", tipo: "", valor: 0 });
    const [error, setError] = useState({ error: false, messageError: "" });
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
        setError({ error: false, messageError: "" });
        if (dato === null) setRegistro({ id: "", numero: "", tipo: "", valor: 0 });
    }

    const editar = async (dato) => {
        setRegistro(dato);
        modalShowHide("b");
    }

    const guardar = async (dato) => {
        if (validateData(dato)) {
            var token = localStorage.getItem('token');
            if (dato.id) {
                await editarHabitacion(dato.id, token, dato);
                await getDatos(token);
                modalShowHide("b");
            } else {
                await crearHabitacion(token, dato);
                await getDatos(token);
                modalShowHide("b");
            }
        }
    }

    const validateData = (data) => {
        if (!data.numero) {
            setError({ error: true, messageError: "Numero de habitacion requerido!" });
            return false;
        }
        if (!data.tipo) {
            setError({ error: true, messageError: "Tipo de habitacion requerido!" });
            return false;
        }
        if (!data.valor) {
            setError({ error: true, messageError: "Valor de habitacion requerido!" });
            return false;
        }

        const result = habitaciones.filter(habitacion => habitacion.numero.toString() === data.numero.toString());
        console.log(result);
        if(data.id === "" && result.length > 0){
            setError({ error: true, messageError: "Numero de habitacion ya existe." });
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
            <div>
                <Container>
                    <div className='my-5 text-center'>
                        <Card>
                            <CardHeader>
                                <h2>Habitaciones</h2>
                                <div style={{ textAlign: 'left' }}>
                                    <Button color='success' onClick={() => modalShowHide(null)}>Nueva Habitacion</Button>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Numero</th>
                                            <th>Tipo</th>
                                            <th>Valor</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {habitaciones.map((dato, key) =>
                                            <tr key={key}>
                                                <td>{dato.id}</td>
                                                <td>{dato.numero}</td>
                                                <td>{dato.tipo}</td>
                                                <td>{numeral(dato.valor).format('$0,0.00')}</td>
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
                {error.error === true ? <div className="alert alert-danger" role="alert">{error.messageError}</div> : <></>}
                <ModalBody>
                    <FormGroup>
                        <label>id:</label>
                        <input className="form-control" name="id" type="text" onChange={handleChange} value={registro.id} disabled />
                    </FormGroup>
                    <FormGroup>
                        <label>Numero:</label>
                        <input className="form-control" name="numero" type="number" onChange={handleChange} value={registro.numero} disabled={registro.id} required />
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
