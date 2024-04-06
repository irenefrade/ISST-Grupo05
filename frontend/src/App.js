import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes, Redirect} from 'react-router-dom';
import './App.css';
import PrivateRoute from './PrivateRoute'
import Horarios from './components/Horarios/Horarios';
import HorariosEmpleados from './components/Horarios/HorariosEmpleados';
import Login from './components/Interfaces/Login';
import Home from './components/Interfaces/Home';
import Footer from './components/Interfaces/Footer';


export const LoginContext = createContext();

function App() {
    const [empleados2, setEmpleados2] = useState([]);
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
        localStorage.setItem('userLogged', userLogged);
    }, [userLogged]);   

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
                        <Route element={<PrivateRoute />}>
                            <Route path="/home" element={<Home empleados2={empleados2}/>}></Route>
                         
                            <Route path="/horarios" element={<Horarios empleados={empleados2}/>} />
                            <Route path="/horarios/:idHorario" element={<HorariosEmpleados empleados2={empleados2}/>} />
                            
                        </Route>
                    </Routes>
                  }
                </div>

                
                <Footer/>
                            
            </div>
        </LoginContext.Provider>

    );
}

export default App;