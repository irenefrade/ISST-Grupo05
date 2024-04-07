import React, {useContext, useEffect, useState} from 'react';
import './../../App.css';
import logo from './../../assets/logo.jpg';
import { LoginContext } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';

const HomeEmpresa = (props) => {
    const navigate = useNavigate();

    const trabajadorList = props.empleados2;
    const [checkSubscription, setCheckSubscription] = useState(false)

    const [userLogged, setUserLogged] = useContext(LoginContext);
    const { empresaId } = useParams();


   
     
    //let estaSuscrito = usuarioCorrecto.suscripcionEmpresa;


    const logout = () => {
        setUserLogged()
    }

    useEffect(() =>{
        console.log(userLogged)
    }, [userLogged]);

    return (

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
            
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <img className="logo" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto", width: "240px", height: "150px" }} src={logo}/>
                <h1 style={{ textAlign: "center" }}>Bienvenida empresa, {trabajadorList[empresaId-1].nombreEmpresa}</h1>
                <h6 style={{ textAlign: "center" }}>Salir <Link to="/" onClick={logout}>aquí</Link></h6> 
                <button className='btn btn-primary' style={{ margin: "5vh" }} onClick={() => {setCheckSubscription(true)}}>Gestionar Suscripción</button>
                {checkSubscription ?
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                        <h2 style={{ textAlign: "center" }}>Estado de la suscripción: {trabajadorList[empresaId-1].suscripcionEmpresa ? "Estás suscrito" : "No estás suscrito"}</h2>
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