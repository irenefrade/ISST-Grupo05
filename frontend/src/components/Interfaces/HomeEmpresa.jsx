import React, {useContext, useEffect, useState} from 'react';
import './../../App.css';
import logo from './../../assets/logo.jpg';
import { LoginContext } from '../../App';
import { Link, Navigate  } from 'react-router-dom';

const HomeEmpresa = (props) => {
    const [userLogged, setUserLogged] = useContext(LoginContext);
    const [checkSubscription, setCheckSubscription] = useState(false)

    let nombreEmpresa;
    //let estaSuscrito;

    try {
        nombreEmpresa = userLogged && JSON.parse(userLogged).nombreEmpresa;
        //estaSuscrito = empresaLogged && JSON.parse(empresaLogged).estaSuscrito;
    } catch (error) {
        console.log(`Error parsing JSON: ${error}`);
    }

    const logout = () => {
        setUserLogged()
    }

    useEffect(() =>{
        console.log(userLogged)
    }, [userLogged]);

    return (

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
            
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <img className="logo" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto", width: "150px", height: "150px" }} src={logo}/>
                <h1 style={{ textAlign: "center" }}>Bienvenida empresa,{nombreEmpresa}</h1>
                <h6 style={{ textAlign: "center" }}>Salir <Link to="/" onClick={logout}>aquí</Link></h6> 
                <button className='btn btn-primary' style={{ margin: "5vh" }} onClick={() => {setCheckSubscription(true)}}>Gestionar Suscripción</button>
                {checkSubscription ?
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                        <h2 style={{ textAlign: "center" }}>Estado de la suscripción</h2>
                        <h3 style={{ textAlign: "center", marginTop: "3vh" }}></h3>
                        <button className='btn btn-danger' style={{margin: "4vh"}} onClick={() => {setCheckSubscription(false)}}>Cerrar</button>
                    </div>
                : null
                }
            </div>
            
            
        </div>

    )
}
//{estaSuscrito ? "Estás suscrito" : "No estás suscrito"}
export default HomeEmpresa;