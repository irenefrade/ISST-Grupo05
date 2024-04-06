import React, {useContext, useEffect, useState} from 'react';
import {Outlet, Navigate} from 'react-router-dom'


import { LoginContext } from './App';
import { LoginContextEmpresa } from './App';

const PrivateRoute = ({children, ...rest}) => {
    // const storedUserLogged = localStorage.getItem('userLogged');
    const [userLogged, setUserLogged] = useContext(LoginContext)
    const [empresaLogged, setEmpresaLogged] = useContext(LoginContextEmpresa)

    return(
        userLogged !== "undefined" ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute