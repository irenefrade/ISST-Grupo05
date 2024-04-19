import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Liner from '../Interfaces/Liner';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import { LoginContext } from '../../App';
import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';


const Ausencias = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const trabajadorList = props.empleados2;
    
    

    const empleadosEmpresa = trabajadorList.filter((trabajador) => trabajador.nombreEmpresa === trabajadorList[id-1].nombreEmpresa && trabajador.esControlador === false && trabajador.esResponsable === false);
    
    useEffect(() =>{
        console.log(trabajadorList);
        console.log(trabajadorList[id-1].esResponsable);
        console.log(empleadosEmpresa);
        }, [trabajadorList]);
    


    


    //funcion para modificar el estado de la peticion de ausencia
    const modificarAusencia = async (empleadoId, fechaInicio, estado) => {
        
        const ausenciasEmpleado = empleadosEmpresa.find(empleado => empleado.id === empleadoId).ausencias;
        const ausencia = ausenciasEmpleado.find(ausencia => ausencia.fechaInicio === fechaInicio);
        const idAusencia = ausencia.id;


        const response = await fetch(`http://localhost:8080/ausencias/${idAusencia}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                fechaInicio: fechaInicio,
                fechaFin: ausencia.fechaFin,
                esAusencia: ausencia.esAusencia,
                esVacaciones: ausencia.esVacaciones,
                esBaja: ausencia.esBaja,
                motivo: ausencia.motivo,
                estado: estado,
                empleado: { id: empleadoId }
                
                
            })
        });
        const data = await response.json();
        console.log(data);

    }


    return (
        <Container className="d-flex justify-content-center align-items-center">
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "2vh"}}>
            <button className="btn btn-primary" onClick={() => navigate(`/home/${id}`)} style={{margin: "auto"}} >Volver</button>
    
            {trabajadorList[id-1].esResponsable ? (
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                    <h1>Bienvenido, responsable de RRHH</h1>
                    {empleadosEmpresa.map((empleado, indexEmpleado) => (
                        <div key={indexEmpleado}>
                            <h2>Nombre del empleado: {empleado.nombreCompleto}</h2>
                            {empleado.ausencias.map((ausencia, indexAusencia) => (
                                <MDBCard key={indexAusencia} className='my-5 justify-content-center shadow-lg' style={{width:"250px", backgroundColor: '#d3d3d3' }}>
                                <MDBCardBody>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                        <p> Fecha de inicio: {ausencia.fechaInicio}</p>
                                        <p> Fecha fin: {ausencia.fechaFin}</p>
                                        <p> Tipo de ausencia: {
                                            ausencia.esAusencia ? 'Ausencia' :
                                            ausencia.esVacaciones ? 'Vacaciones' :
                                            ausencia.esBaja ? 'Baja' : 'Desconocido'
                                        }</p>
                                        <p> Motivo: {ausencia.motivo} </p>
                                        <p> Estado: {ausencia.estado} </p>
                                        <button className="btn btn-primary" onClick={() => modificarAusencia(empleado.id, ausencia.fechaInicio, "aceptada")}>Aceptar</button>
                                        <button className="btn btn-primary" onClick={() => modificarAusencia(empleado.id, ausencia.fechaInicio, "rechazada")}>Rechazar</button>


                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                    
                    <h1>Buenas, {trabajadorList[id-1].nombreCompleto}. Estas son tus ausencias</h1>
                    {trabajadorList[id - 1].ausencias.map((ausencia, index) => (
                        <MDBCard key={index} className='my-5 mx-auto justify-content-center shadow-lg' style={{ backgroundColor: '#d3d3d3' }}>
                        <MDBCardBody>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                        <p> Fecha de inicio: {ausencia.fechaInicio}</p>
                                        <p> Fecha fin: {ausencia.fechaFin}</p>
                                        <p> Tipo de ausencia: {
                                            ausencia.esAusencia ? 'Ausencia' :
                                            ausencia.esVacaciones ? 'Vacaciones' :
                                            ausencia.esBaja ? 'Baja' : 'Desconocido'
                                        }</p>
                                        <p> Motivo: {ausencia.motivo} </p>
                                        <p> Estado: {ausencia.estado} </p>
                            </div>
                        </MDBCardBody>
                        </MDBCard>
                    ))}

                    
                    <Link to={`/ausencias/${id}/new`}>
                        <button className="btn btn-primary">Solicitar nueva ausencia</button>
                    </Link>
                </div>
            )}
        </div>
        </Container>
    );
}

export default Ausencias;