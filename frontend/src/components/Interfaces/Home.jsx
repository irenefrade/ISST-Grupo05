import React, {useContext, useEffect, useState} from 'react';
import './../../App.css';
import logo from './../../assets/logo.jpg';
import { LoginContext } from '../../App';
import { Link, Navigate  } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const Home = (props) => {
    const [userLogged, setUserLogged] = useContext(LoginContext);

    let nombreCompleto;
    let numeroTelefono;
    let correoElectronico;
    let departamento;
    let puesto;
    let esControlador;


    try {
        nombreCompleto = userLogged && JSON.parse(userLogged).nombreCompleto; 
        numeroTelefono = userLogged && JSON.parse(userLogged).numeroTelefono;
        correoElectronico = userLogged && JSON.parse(userLogged).correoElectronico; 
        departamento = userLogged && JSON.parse(userLogged).departamento;
        puesto = userLogged && JSON.parse(userLogged).puesto; 
        esControlador = userLogged && JSON.parse(userLogged).esControlador;
    

    } catch (error) {
        console.log(`Error parsing JSON: ${error}`);
      }
    

    const handleHorarios = () => {
        window.location.href = '/horarios';
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
            <h1 style={{ textAlign: "center" }}>Perfil del {nombreCompleto}</h1>
        
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignContent: "space-around", margin: "auto" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "space-around", marginRight: "2vh" }}>
                    {esControlador ? 
                        <button className="btn btn-primary" style={{ height: "10vh", width: "20vw", marginBottom: "1vh", marginTop: "2vh" }} onClick={handleHorarios}>Control de horarios de empleados</button>
                        :
                        <button className="btn btn-primary" style={{ height: "10vh", width: "20vw", marginBottom: "1vh", marginTop: "2vh" }} onClick={handleHorarios}>Registrar mi horario</button>
                    }
                </div>
                
              <MDBCard  className='my-5 mx-auto justify-content-center shadow-lg' style={{ backgroundColor: '#d3d3d3' }}>
              <MDBCardBody>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "space-around" }}>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Nombre: {nombreCompleto}</h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Teléfono: {numeroTelefono}</h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Email: {correoElectronico}</h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Departamento: {departamento}</h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Puesto: {puesto}</h6>
                    <h6 style={{ textAlign: "left", width: "50vw", marginLeft: "10vh" }}>Controlador: {esControlador ? "Sí" : "No"}</h6>
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