import React, {useContext, useEffect, useState} from 'react';
import './../../App.css';
import logo from './../../assets/Frame 1.svg';
import { LoginContextEmpresa } from '../../App';
import { Link, Navigate  } from 'react-router-dom';

const HomeEmpresa = (props) => {
    const [empresaLogged, setEmpresaLogged] = useContext(LoginContextEmpresa);

    let nombreEmpresa;

    try {
        nombreEmpresa = empresaLogged && JSON.parse(empresaLogged).nombreEmpresa; 
    } catch (error) {
        console.log(`Error parsing JSON: ${error}`);
      }
    


    const logout = () => {
        setEmpresaLogged()
    }

    useEffect(() =>{
        console.log(empresaLogged)
      }, [empresaLogged]);

    return (

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
            
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
                <img className="logo" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto", width: "150px", height: "150px" }} src={logo}/>
                <h1 style={{ textAlign: "center" }}>Bienvenida empresa, {nombreEmpresa}</h1>
                <h6 style={{ textAlign: "center" }}>Salir <Link to="/" onClick={logout}>aquí</Link></h6>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "space-around", margin: "auto" }}>

                    
                 
                </div>   
            </div>   
            
            
        </div>

    )
}

export default HomeEmpresa;