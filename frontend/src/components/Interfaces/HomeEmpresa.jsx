import React, {useContext, useEffect, useState} from 'react';
import './../../App.css';
import logo from './../../assets/logo.jpg';
import { LoginContext } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const HomeEmpresa = (props) => {
    const navigate = useNavigate();

    const trabajadorList = props.empleados2;
    const [checkSubscription, setCheckSubscription] = useState(false);
    
    const [estadoSuscripcion, setEstadoSuscripcion] = useState(null);

    const [userLogged, setUserLogged] = useContext(LoginContext);
    const { empresaId } = useParams();
    const estaSuscrito = null;

    //hacer getSuscripcion del usuario actual al backend 
    useEffect(() => {
        const getSuscripcion = async () => {
            try {
                const response = await fetch(`http://localhost:8080/empleados/${empresaId}`);
                const data = await response.json();
                const estaSuscrito = data.suscripcionEmpresa;
                setEstadoSuscripcion(estaSuscrito); // Almacena el estado de la suscripción en estadoSuscripcion
            } catch (error) {
                console.error(error);
            }
        };
    
        getSuscripcion();
    }, [empresaId]);


     
    const gestionarSuscripcion = async(bool) => {
        const response = await fetch(`http://localhost:8080/empleados/${empresaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                nombreCompleto: trabajadorList[empresaId-1].nombreCompleto,
                numeroTelefono: trabajadorList[empresaId-1].numeroTelefono,
                correoElectronico: trabajadorList[empresaId-1].correoElectronico,
                password: trabajadorList[empresaId-1].password,
                departamento: trabajadorList[empresaId-1].departamento,
                puesto: trabajadorList[empresaId-1].puesto,
                esControlador: trabajadorList[empresaId-1].esControlador,
                esResponsable: trabajadorList[empresaId-1].esResponsable,
                nombreEmpresa: trabajadorList[empresaId-1].nombreEmpresa,
                suscripcionEmpresa: bool,
                passwordEmpresa: trabajadorList[empresaId-1].passwordEmpresa,
                empresaId: empresaId
                
                
            })
        });
        const data = await response.json();
        console.log(data);
        


    }

    const logout = () => {
        setUserLogged()
    }

    

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "center", margin: "auto" }}>
         <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignContent: "center", margin: "auto" }}>
            <img className="logo" style={{ width: "240px", height: "150px" }} src={logo}/>
            <h6 style={{ textAlign: "center", marginTop: "50px", marginLeft:"200px" }}><Link to="/" onClick={logout}>Salir</Link></h6>
            </div>
             <MDBCard  className='my-5 mx-auto justify-content-center shadow-lg' style={{ backgroundColor: '#d3d3d3' }}>
              <MDBCardBody>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                
                <h1 style={{ textAlign: "center" }}>Bienvenida empresa, {trabajadorList[empresaId-1].nombreEmpresa}</h1>
                
                <button className='btn btn-primary' style={{ margin: "5vh" ,backgroundColor: "#696969"}} onClick={() => {setCheckSubscription(true)}}>Ver estado de mi suscripción</button>
                {checkSubscription ?
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                        <h2 style={{ textAlign: "center" }}>Estado de la suscripción: {estadoSuscripcion ? "Estás suscrito" : "No estás suscrito"}</h2>
                        <div>
                            {estadoSuscripcion ? (
                                <button className='btn btn-danger' style={{ margin: "5vh"}} onClick={() => gestionarSuscripcion(false)}>Cancelar Suscripción</button>
                            ) : (
                                <button className='btn btn-success' style={{ margin: "5vh"}} onClick={() => gestionarSuscripcion(true)}>Suscribirse</button>
                            )}
                        </div>                        
                        <h3 style={{ textAlign: "center", marginTop: "3vh" }}></h3>
                        <button className='btn btn-danger' style={{margin: "4vh"}} onClick={() => {setCheckSubscription(false)}}>Cerrar</button>
                    </div>
                : 
                null
                }
            </div>
            </MDBCardBody>
            </MDBCard>
            
        
        </div>

    )
}
//{estaSuscrito ? "Estás suscrito" : "No estás suscrito"}
export default HomeEmpresa;