import React, {useContext, useEffect, useState} from 'react';
import './../../App.css';
import logo from './../../assets/logo.jpg';
import { LoginContext } from '../../App';
import { Link, Navigate, useNavigate, useParams  } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const Home = (props) => {
    const navigate = useNavigate();

    const trabajadorList = props.empleados2;

    const [userLogged, setUserLogged] = useContext(LoginContext);
    const { id } = useParams();
    

    const handleHorarios = () => {
        navigate(`/horarios/${id}`);
    }


    const logout = () => {
        setUserLogged()
    }

    useEffect(() =>{
        console.log(userLogged)
      }, [userLogged]);

    return (

 



        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
        {userLogged !== "undefined" ?
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignContent: "flex-start", margin: "auto" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", width: "100%" }}>
                <img className="logo" style={{ width: "240px", height: "150px" }} src={logo}/>
                <h6 style={{ textAlign: "center", marginTop: "50px" }}><Link to="/" onClick={logout}>Salir</Link></h6>
            </div>
            <h1 style={{ textAlign: "center" }}>Perfil de {trabajadorList[id-1].nombreCompleto}</h1>
        
            
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "space-around", marginRight: "2vh" }}>
                
           
              <MDBCard  className='my-5 mx-auto justify-content-center shadow-lg' style={{ backgroundColor: '#d3d3d3' }}>
              <MDBCardBody>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "space-around" }}>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Nombre: {trabajadorList[id-1].nombreCompleto} </h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>
                    Controlador: {trabajadorList[id-1].esControlador ? 'Sí' : 'No'}</h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Correo: {trabajadorList[id-1].correoElectronico} </h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Empresa: {trabajadorList[id-1].nombreEmpresa} </h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Puesto: {trabajadorList[id-1].puesto} </h6>

                </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard  className='mx-auto' >
                <MDBCardBody>
                    <div style={{ display: "centre", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>

                    {trabajadorList[id-1].esControlador ? (
                            <button className="btn btn-primary" style={{ height: "10vh", width: "20vw", marginBottom: "1vh", marginTop: "2vh" ,backgroundColor: "#696969" }} onClick={handleHorarios}>Control de horarios de empleados</button>
                        ) : (
                            <button className="btn btn-primary" style={{ height: "10vh", width: "20vw", marginBottom: "1vh", marginTop: "2vh",backgroundColor: "#696969" }} onClick={handleHorarios}>Registrar mi horario</button>
                        )}
                    </div>
                    </MDBCardBody>
                </MDBCard>
                 </div>
            </div>
            
            :
            <Navigate to={`/`}/>
        }
    </div>


    )
}

export default Home;