import React, {useEffect } from 'react';
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useState, useContext } from 'react';
import { LoginContextEmpresa } from '../../App';
import { Link, Navigate } from "react-router-dom";


const LoginEmpresa = (props) => {

  const empresaList = props.empresas;

  const [username, setUsername] = useState('');
  const [cont, setCont] = useState('');
  const [error, setError] = useState('');
  const [empresaLogged, setEmpresaLogged] = useContext(LoginContextEmpresa)

  
  useEffect(() =>{
    console.log(empresaLogged)
  }, [empresaLogged]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario a un backend o un servicio de autenticación

    const esUsuarioCorrecto = empresaList.find((empresaItem) => {
      return (empresaItem.nombreEmpresa === username && empresaItem.password === cont );//&& trabajadorItem.rec == true
    });

    const usuarioCorrecto = empresaList.find((empresaItem) => {
      if (empresaItem.nombreEmpresa === username && empresaItem.password === cont) {
        return empresaItem;
      }
    });

    if (esUsuarioCorrecto) {
      // Si la autenticación es exitosa, redirigir al usuario a la página de inicio
      setEmpresaLogged(JSON.stringify(usuarioCorrecto))
      window.location.href = "/homeempresa"
    } else {
      // Si la autenticación falla, mostrar un mensaje de error
     
      setError('Credenciales incorrectas');
    }
    
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto", width: "40vw" }}>
      <MDBContainer style={{ marginTop: "10vh" }}>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto justify-content-center shadow-lg'>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                <h2 className="fw-bold mb-2 text-center">Inicia sesión como empresa</h2>
                <br></br>
                <form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                <MDBInput wrapperClass='mb-3 w-100 rounded shadow' placeholder='Nombre' id='formControl' value={username} onChange={(event) => setUsername(event.target.value)} type='text' size="lg" />
                <MDBInput wrapperClass='mb-4 w-100 rounded shadow' placeholder='Contraseña' id='formControlDefault' value={cont} type='password' onChange={(event) => setCont(event.target.value)} size="lg" />

                <button type="submit" className="btn btn-primary rounded shadow" onClick={handleSubmit}> Iniciar sesión </button>
                
                </form>
                <hr className="my-4" />
                <h6 style={{ textAlign: "center" }}>¿Eres un empleado? pincha <Link to="/">aquí</Link></h6>

                {error && <div style={{ textAlign: "center" }}>{error}</div>}

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </div>
  )
}

export default LoginEmpresa;