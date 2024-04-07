import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes, Redirect} from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute'
import Horarios from './components/Horarios/Horarios';
import HorariosEmpleados from './components/Horarios/HorariosEmpleados';
import Login from './components/Interfaces/Login';
import LoginEmpresa from './components/Interfaces/LoginEmpresa';
import Home from './components/Interfaces/Home';
import HomeEmpresa from './components/Interfaces/HomeEmpresa';


export const LoginContextEmpresa = createContext();
export const LoginContext = createContext();


function App() {
    const [empleados2, setEmpleados2] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [userLogged, setUserLogged] = useState(null);
    const [empresaLogged, setEmpresaLogged] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUserLogged = localStorage.getItem('userLogged');
        if (storedUserLogged !== null) {
            setUserLogged(storedUserLogged);
        } else {
          setUserLogged(null)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('empresaLogged', empresaLogged);
    }, [empresaLogged]);   
    useEffect(() => {
      const storedEmpresaLogged = localStorage.getItem('empresaLogged');
      if (storedEmpresaLogged !== null) {
          setEmpresaLogged(storedEmpresaLogged);
      } else {
        setEmpresaLogged(null)
      }
  }, []);

  useEffect(() => {
      localStorage.setItem('empresaLogged', empresaLogged);
  }, [empresaLogged]);   

    useEffect(() => {
        const fetchData = async () => {
          
          const responseEmpleados2 = await fetch('http://localhost:8080/empleados');
          const responseEmpresas = await fetch('http://localhost:8080/empresas');
          const empleados2Data = await responseEmpleados2.json();
          const empresasData = await responseEmpresas.json();

          setEmpleados2(empleados2Data);
          setEmpresas(empresasData);
   
        };
        fetchData();
      }, []); 
      
      useEffect(() => {
        const timeoutId = setTimeout(() => {
          setIsLoading(false)
          console.log('Este useEffect se ejecutó después de 1ms');
        }, 1);
        return () => clearTimeout(timeoutId);
      }, []);

     

    return (
        <LoginContext.Provider value={[userLogged, setUserLogged]}> 
        <LoginContextEmpresa.Provider value={[empresaLogged, setEmpresaLogged]}> 
            <div style={{
                backgroundColor: '#F5FFFA',
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",      
                height:"88vh"}}>

                <div class="contenedor-flexbox">
                    {isLoading ? //userLogged === "undefined"
                    <div >
                    </div>
                    :
                      <Routes>
                        <Route path="/" element={<Login empleados2={empleados2} />}></Route>
                        <Route path="/loginempresa" element={<LoginEmpresa empresas={empresas} />}></Route>
                        <Route element={<PrivateRoute />}>
                            <Route path="/home" element={<Home empleados2={empleados2}/>}></Route>
                            <Route path="/homeempresa" element={<HomeEmpresa empresas={empresas}/>}></Route>
                            <Route path="/horarios" element={<Horarios empleados={empleados2}/>} />
                            <Route path="/horarios/:idHorario" element={<HorariosEmpleados empleados2={empleados2}/>} />
                            
                        </Route>
                    </Routes>
                  }
                </div>

                
               
                            
            </div>
            </LoginContextEmpresa.Provider>
        </LoginContext.Provider>

    );
}

export default App;