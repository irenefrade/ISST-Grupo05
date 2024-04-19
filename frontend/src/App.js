import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes, Redirect, useParams} from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute'
import Horarios from './components/Horarios/Horarios';
import Ausencias from './components/Ausencias/Ausencias';
import FormAusencia from './components/Ausencias/FormAusencia';
import Login from './components/Interfaces/Login';
import LoginEmpresa from './components/Interfaces/LoginEmpresa';
import Home from './components/Interfaces/Home';
import HomeEmpresa from './components/Interfaces/HomeEmpresa';



export const LoginContext = createContext();


function App() {
    const [empleados2, setEmpleados2] = useState([]);
    //const [empresas, setEmpresas] = useState([]);
    const [userLogged, setUserLogged] = useState(null);

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
        const fetchData = async () => {
          
          const responseEmpleados2 = await fetch('http://localhost:8080/empleados');
          const empleados2Data = await responseEmpleados2.json();
          setEmpleados2(empleados2Data);
   
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
     
            <div style={{
                backgroundColor: '#FFFFFF',
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
                        <Route path="/loginempresa" element={<LoginEmpresa empleados2={empleados2} />}></Route>
                        <Route element={<PrivateRoute />}>
                            <Route path="/home/:id" element={<Home empleados2={empleados2}/>}></Route>
                            <Route path="/homeempresa/:empresaId" element={<HomeEmpresa empleados2={empleados2}/>}></Route>
                            <Route path="/horarios/:id" element={<Horarios empleados2={empleados2}/>} />
                            <Route path="/ausencias/:id/" element={<Ausencias empleados2={empleados2}/>} />
                            <Route path="/ausencias/:id/new" element={<FormAusencia empleados2={empleados2}/>} />
                            
                        </Route>
                    </Routes>
                  }
                </div>

                
               
                            
            </div>
        
        </LoginContext.Provider>

    );
}

export default App;