import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

export const HeaderComponent = () => {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/');
    }

    return (
        <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className='navbar-brand' to={"/"}>Hotel</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className='nav-link' to={"/habitaciones"}>Habitaciones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={"/reservas"}>Reservas</Link>
                        </li>
                    </ul>
                </div>
                <Button color='danger' onClick={() => logout()}>Salir</Button>
            </nav>
        </div>
        </>
    )
}
