import React from 'react';
import { Card, CardHeader, CardBody, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getToken } from './LoginServices';

export const LoginComponent = () => {
    const navigate = useNavigate();
    const [login, setLogin] = React.useState({ nombre: "", email: "" });
    const [errorLogin, setErrorLogin] = React.useState(false);

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    const logear = React.useCallback(async () => {
        if (!validaDatos())
        try {
            let token = await getToken(login);
            localStorage.setItem('token', token.data.token);
            navigate('/habitaciones');
        } catch (error) {
            setErrorLogin(true);
            console.log(error);
        }
        else setErrorLogin(true);

    }, [login, navigate]);

    const validaDatos = () => {
        if (!login.nombre){
            return(true);
        }
        if (!login.email){
            return(true);
        }
    }



    return (
        <>
            <div className="my-4 justify-content-center d-flex align-items-center">
                <Card className="col-md-2 shadow-lg">
                    <CardHeader className='text-center bg-dark text-light'>
                        <h3> <i className="bi bi-person"> </i>Login</h3>
                    </CardHeader>
                    {errorLogin ? <div class="alert alert-danger my-2" role="alert">
                        Usuario o contraseña incorrectos!
                    </div> : <div></div>}
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <input id='email' type="text" className="form-control" name='email' placeholder='email' value={login.email} onChange={handleChange} require/>
                            </FormGroup>

                            <FormGroup>
                                <input id='nombre' type="nombre" className="form-control" name='nombre' placeholder='nombre' value={login.nombre} onChange={handleChange} require/>
                            </FormGroup>
                            <div className='text-center'>
                                <Button color='success' onClick={() => logear()}><i className="bi bi-arrow-right-square"> Ingresar</i></Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
