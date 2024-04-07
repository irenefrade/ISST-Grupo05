import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Liner from '../Interfaces/Liner';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import { LoginContext } from '../../App';
import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';



const Horarios = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const trabajadorList = props.empleados2;
    const esControlador = trabajadorList[id-1].esControlador;
    const [horariosList, setHorariosList] = useState(null);

    useEffect(() =>{
        console.log(esControlador)
    }, [esControlador]);

    const empleadosEmpresa = trabajadorList.filter((trabajador) => trabajador.nombreEmpresa === trabajadorList[id-1].nombreEmpresa && trabajador.esControlador === false);

        


    

    return (
        <Container className="d-flex justify-content-center align-items-center">
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "2vh"}}>
            <button className="btn btn-primary" onClick={() => navigate(`/home/${id}`)} style={{margin: "auto"}} >Volver</button>
    
            {esControlador ? (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                    <h1>Bienvenido, controlador</h1>
                    {empleadosEmpresa.map((empleado, indexEmpleado) => (
                        <div key={indexEmpleado}>
                            <h2>Nombre del empleado: {empleado.nombreCompleto}</h2>
                            {empleado.horarios.map((horario, indexHorario) => (
                                <MDBCard key={indexHorario} className='my-5 justify-content-center shadow-lg' style={{width:"250px", backgroundColor: '#d3d3d3' }}>
                                <MDBCardBody>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                        <p> Fecha: {horario.fecha}</p>
                                        <p> Hora de entrada: {horario.horaEntrada}</p>
                                        <p> Hora de salida: {horario.horaSalida}</p>
                                        <p> Tiempo de descanso: {horario.minutosPau} minutos</p>
                                        <p> Horas trabajadas: {horario.minutosTot / 60} horas</p>
                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                    
                    <h1>Buenas, {trabajadorList[id-1].nombreCompleto}. Estos son tus horarios</h1>
                    {trabajadorList[id - 1].horarios.map((horario, index) => (
                        <MDBCard key={index} className='my-5 mx-auto justify-content-center shadow-lg' style={{ backgroundColor: '#d3d3d3' }}>
                        <MDBCardBody>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                <p> Fecha: {horario.fecha}</p>
                                <p> Hora de entrada: {horario.horaEntrada}</p>
                                <p> Hora de salida: {horario.horaSalida}</p>
                                <p> Tiempo de descanso: {horario.minutosPau} minutos</p>
                                <p> Horas trabajadas: {horario.minutosTot / 60} horas</p>
                            </div>
                        </MDBCardBody>
                        </MDBCard>
                    ))}
                </div>
            )}
        </div>
        </Container>
    );
}


export default Horarios;