import { MDBCard, MDBCardBody, MDBCheckbox, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';



const Horarios = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const trabajadorList = props.empleados2;
    const esControlador = trabajadorList[id-1].esControlador;
    const [horariosList, setHorariosList] = useState(null);
    const [fechaInicio,setFechaInicio] = useState(new Date()); //puede que sea dia
    const [entrada, setEntrada] = useState('');
    const [salida, setSalida] = useState('');
    const [pausa, setPausa] = useState('');
    const [jornada, setJornada] = useState(true);

    const [fichado, setFichado] = useState(false);

    useEffect(() =>{
        console.log(esControlador)
    }, [esControlador]); //hay más cosas en el useEffect

    const empleadosEmpresa = trabajadorList.filter((trabajador) => trabajador.nombreEmpresa === trabajadorList[id-1].nombreEmpresa && trabajador.esControlador === false);

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
        setFichado(true);
        setTimeout(() => {
            setFichado(false);
            navigate(`/home/${id}`)
        }, 3000);
        
    }

    

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
                                        <p> Jornada: {horario.jornada ? "mañana" : "tarde"}</p>
                                        <p> Hora de entrada: {horario.horaEntrada}</p>
                                        <p> Hora de salida: {horario.horaSalida}</p>
                                        <p> Tiempo de descanso: {horario.minutosPau} minutos</p>
                                        <p> Tiempo extra: {horario.minutosExt} minutos</p>
                                        <p> Horas trabajadas: {Math.floor(horario.minutosTot / 60)} horas y {horario.minutosTot % 60} minutos</p>
                                    </div>
                                </MDBCardBody>
                                </MDBCard>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto"}}>
                    
                    <h1>Buenas, {trabajadorList[id-1].nombreCompleto}</h1>

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
                                <p style={{fontSize: 18}}>Hora de entrada</p>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Horario entrada' id='entrada' value={entrada} onChange={(event) => setEntrada(event.target.value)} type='time'/>
                                <p style={{fontSize: 18}}>Tiempo de descanso</p>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Pausa en minutos' id='pausa' value={pausa} onChange={(event) => setPausa(event.target.value)} type='double'/> 
                                <p style={{fontSize: 18}}>Hora de salida</p>
                                <MDBInput wrapperClass='mb-4 w-100' placeholder='Horario salida' id='salida' value={salida} onChange={(event) => setSalida(event.target.value)} type='time'/>
                                <MDBCheckbox labelClass="mr-3" label='Horario tarde (marcar en caso de ser horario de tarde)' id='checkAusencia' value={!jornada} onChange={(event) => setJornada(!event.target.checked)}/>  
                                </div>
                            </form>
                            <button type="submit" className="btn btn-primary" onClick={handlePublicarHorario}>Guardar jornada</button>
                            {fichado ? (<p style={{fontSize: 20, textAlign: "center", marginTop: 15, fontWeight: "bold"}}>Horario guardado</p>) : (null)}

                        </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>
                    

                </div>
            )}
        </div>
        </Container>
    );
}


export default Horarios;


// a lo mejor en vez de tener todos los parámetros podemos tener hora entrada, hora salida, minutos pausa y que el extra y trabajados se calculen la verdad y que la jornada sea parte del empleado