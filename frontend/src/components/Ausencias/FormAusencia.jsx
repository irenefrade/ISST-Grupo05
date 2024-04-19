import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea} from 'mdb-react-ui-kit';
import { Container, Col, Row, Card } from "react-bootstrap";
import { LoginContext } from '../../App';
import {useContext, useEffect, useState} from 'react';




const FormAusencia = () => {
    const { id } = useParams();
    const [fechaInicio,setFechaInicio] = useState('');
    const [fechaFin,setFechaFin] = useState('');
    const [ausencia, setAusencia] = useState(false);
    const [vacaciones, setVacaciones] = useState(false);
    const [baja, setBaja] = useState(false);
    const [motivo, setMotivo] = useState('');
    

    const [userLogged, setUserLogged] = useContext(LoginContext);

    const navigate = useNavigate();

    const handlePublicarSolicitud = async () => {
        const response = await fetch(`http://localhost:8080/ausencias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                esAusencia: ausencia,
                esVacaciones: vacaciones,
                esBaja: baja,
                motivo: motivo,
                estado: "Pendiente",
                empleado: {id: id}
                
                
            })
        });
        const data = await response.json();
        console.log(data);
        navigate(`/ausencias/${id}`);
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
             <MDBContainer style={{ marginTop: "2vh", width: "80vw", height: "56vh"}}>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                        <MDBCard className='bg-white my-5 mx-auto justify-content-center'>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Crear solicitud de ausencia</h2>
                            <br></br>
                            <form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                <div>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Fecha inicio' id='fechaInicio' value={fechaInicio} onChange={(event) => setFechaInicio(event.target.value)} type='date'/>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Fecha fin' id='fechaFin' value={fechaFin} onChange={(event) => setFechaFin(event.target.value)} type='date'/> 
                                </div>
                                <MDBTextArea wrapperClass='mb-4 w-100' placeholder='Motivo' id='motivo' value={motivo} onChange={(event) => setMotivo(event.target.value)} type='text' rows={4} style={{ resize: "none" }}/>
                                
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center",  margin: "auto" }}>
                                    <MDBCheckbox labelClass="mr-3" label='Baja' id='checkAusencia' value={baja} onChange={(event) => setBaja(event.target.checked)}/>
                                    <MDBCheckbox labelClass="mr-3" label='Ausencia' id='checkAusencia' value={ausencia} onChange={(event) => setAusencia(event.target.checked)}/>
                                    <MDBCheckbox labelClass="mr-3" label='Vacaciones' id='checkAusencia' value={vacaciones} onChange={(event) => setVacaciones(event.target.checked)}/>                                   
                                </div>
                            </form>
                            <button type="submit" className="btn btn-primary" onClick={handlePublicarSolicitud}>Generar solicitud</button>

                        </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>

    )
}



export default FormAusencia;