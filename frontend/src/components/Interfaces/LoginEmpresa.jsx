import React, { useEffect, useState, useContext } from 'react';
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { Link,useNavigate } from "react-router-dom";
import { LoginContext } from '../../App';

const LoginEmpresa = (props) => {
  const navigate = useNavigate();
  const trabajadorList = props.empleados2;
  const [username, setUsername] = useState('');
  const [cont, setCont] = useState('');
  const [error, setError] = useState('');
  const [userLogged, setUserLogged] = useContext(LoginContext);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("verás esto en el login");
    console.log(trabajadorList);
    console.log(userLogged);
  }, [userLogged]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const esUsuarioCorrecto = trabajadorList.find((trabajadorItem) => {
      return trabajadorItem.nombreEmpresa === username && trabajadorItem.passwordEmpresa === cont;
    });

    const usuarioCorrecto = trabajadorList.find((trabajadorItem) => {
      if (trabajadorItem.nombreEmpresa === username && trabajadorItem.passwordEmpresa === cont) {
        return trabajadorItem;
      }
    });

    if (esUsuarioCorrecto) {
      setUserLogged(JSON.stringify(usuarioCorrecto));
      navigate(`/homeempresa/${usuarioCorrecto.empresaId}`);
    } else {
      setError('Credenciales incorrectas');
      setIsError(true);
      setTimeout(() => setIsError(false), 500); // Reiniciamos isError después de 0.5 segundos
    }
  };

  return (
    <div style={{
      backgroundImage: `url('https://live.staticflickr.com/1683/23413566273_222a3af1f7_b.jpg')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      margin: "auto",
      width: "100%"
    }}>
      <MDBContainer>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-white my-5 mx-auto justify-content-center shadow-lg'>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                <h2 className="fw-bold mb-2 text-center">Inicia sesión como empresa</h2>
                <br />
                <form style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                  <MDBInput wrapperClass='mb-3 w-100 rounded shadow' placeholder='Nombre' id='formControl' value={username} onChange={(event) => setUsername(event.target.value)} type='text' size="lg" />
                  <MDBInput wrapperClass='mb-4 w-100 rounded shadow' placeholder='Contraseña' id='formControlDefault' value={cont} type='password' onChange={(event) => setCont(event.target.value)} size="lg" />
                  <button
                    type="submit"
                    className={`btn btn-primary rounded shadow ${isError ? 'shake' : ''}`}
                    onClick={handleSubmit}
                    style={{ backgroundColor: 'green', color: 'white' }}
                  >
                    Iniciar sesión
                  </button>
                </form>
                <hr className="my-4" />
                <h6 style={{ textAlign: "center" }}>¿Eres un empleado? pincha <Link to="/">aquí</Link></h6>
                {error && <div style={{ textAlign: "center" }}>{error}</div>}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Estilos CSS integrados */}
      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }

        .shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  )
}

export default LoginEmpresa;