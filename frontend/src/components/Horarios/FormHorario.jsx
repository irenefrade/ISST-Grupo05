import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn, MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTextArea} from 'mdb-react-ui-kit';
import { Container, Col, Row, Card } from "react-bootstrap";
import { LoginContext } from '../../App';
import {useContext, useEffect, useState} from 'react';

const FormHorarios = () => {
    const { id } = useParams();
    const [fechaInicio,setFechaInicio] = useState(''); //puede que sea dia
    const [entrada, setEntrada] = useState('');
    const [salida, setSalida] = useState('');
    const [pausa, setPausa] = useState('');
    const [jornada, setJornada] = useState(true);

    const [userLogged, setUserLogged] = useContext(LoginContext);

    const navigate = useNavigate();

    const handlePublicarHorario = async () => {

        // Convertir horas a minutos
        const [horaEntrada, minutoEntrada] = entrada.split(':').map(Number);
        const [horaSalida, minutoSalida] = salida.split(':').map(Number);
        const entradaMinutos = horaEntrada * 60 + minutoEntrada;
        const salidaMinutos = horaSalida * 60 + minutoSalida;

        // Calcular minutos totales y minutos extra
        const minutosTot = salidaMinutos - entradaMinutos - pausa;
        const minutosExt = 480 - minutosTot;

        const response = await fetch(`http://localhost:8080/horarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fecha: fechaInicio,
                horaEntrada: entrada,
                horaSalida: salida,
                minutosPau: pausa,
                minutosExt: minutosExt,
                minutosTot: minutosTot,
                jornada: jornada,
                empleado: {id: id}
            })
        });
        const data = await response.json();
        console.log(data);
        navigate(`/horarios/${id}`);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
             <MDBContainer style={{ marginTop: "2vh", width: "80vw", height: "56vh"}}>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                        <MDBCard className='bg-white my-5 mx-auto justify-content-center'>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                            <h2 className="fw-bold mb-2 text-center">Registra tu jornada del día</h2>
                            <br></br>
                            <form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                                <div>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Fecha inicio' id='fechaInicio' value={fechaInicio} onChange={(event) => setFechaInicio(event.target.value)} type='date'/>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Horario entrada' id='entrada' value={entrada} onChange={(event) => setEntrada(event.target.value)} type='time'/>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Pausa' id='pausa' value={pausa} onChange={(event) => setPausa(event.target.value)} type='double'/> 
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Horario salida' id='salida' value={salida} onChange={(event) => setSalida(event.target.value)} type='time'/>
                                <MDBCheckbox labelClass="mr-3" label='Horario tarde (marcar en caso de ser horario de tarde)' id='checkAusencia' value={!jornada} onChange={(event) => setJornada(!event.target.checked)}/>  
                                </div>
                            </form>
                            <button type="submit" className="btn btn-primary" onClick={handlePublicarHorario}>Guardar jornada</button>

                        </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>


    );
};

export default FormHorarios;