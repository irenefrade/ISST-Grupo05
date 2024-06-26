import React from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from './../../assets/logo.jpg';
import { Link, Navigate  } from 'react-router-dom';


const Liner = (props) => {


    const empleados = props.empleados;

    const handleHorarios = () => {
        window.location.href = '/horarios';
    }

    const handleIMG = () => {
        window.location.href = '/home';
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
            <Row>   
                <img className="logo" src={logo} style={{ display: "flex", justifyContent: "right", alignContent: "centre", height: "100px", width: "220px" }}  onClick={handleIMG} alt="logo" />
                <button className="btn btn-primary" style={{ margin: 25, height: 50, width: 250 }} onClick={handleHorarios}>Control de horarios</button>
               
            </Row>
            <h6 style={{ textAlign: "left" }}><Link to="/home">Atrás</Link></h6>
        </div>
    );
}

export default Liner;