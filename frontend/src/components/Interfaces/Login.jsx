import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { LoginContext } from '../../App';


const Login = (props) => {
  const navigate = useNavigate();
  const trabajadorList = props.empleados2;
  const [username, setUsername] = useState('');
  const [cont, setCont] = useState('');
  const [error, setError] = useState('');
  const [userLogged, setUserLogged] = useContext(LoginContext);
  const [isError, setIsError] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);


  useEffect(() => {
    console.log("verás esto en el login");
    console.log(trabajadorList);
    console.log(userLogged);
  }, [userLogged]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !cont) {
      setError('Por favor, rellena todos los campos.');
      setIsError(true);
      return;
    }

    const sanitizeInput = (input) => {
      
      const sqlString = require('sqlstring');
      input= sqlString.escape(input);
      return input.replace(/<[^>]*>?/gm, '');
    };
    
    setUsername(sanitizeInput(username));
    setCont(sanitizeInput(cont));


    if (loginAttempts >= 3) {
      setError('Demasiados intentos fallidos. Por favor, inténtalo de nuevo más tarde.');
      setIsError(true);
      return;
    }

    const esUsuarioCorrecto = trabajadorList.find((trabajadorItem) => {
      return trabajadorItem.correoElectronico === username && trabajadorItem.password === cont;
    });

    const usuarioCorrecto = trabajadorList.find((trabajadorItem) => {
      if (trabajadorItem.correoElectronico === username && trabajadorItem.password === cont) {
        return trabajadorItem.id;
      }
    });

    

    if (esUsuarioCorrecto) {
      setUserLogged(JSON.stringify(usuarioCorrecto));
      navigate(`/home/${usuarioCorrecto.id}`);
    } else {
      setLoginAttempts(prev => prev + 1);
      setError('Credenciales incorrectas');
      setIsError(true);
      setTimeout(() => setIsError(false), 500); // Reiniciamos isError después de 0.5 segundos
    }
  };

  return (
    <div style={{
      backgroundImage: `url('https://preview.redd.it/6a2ce9ivarl51.jpg?width=1080&crop=smart&auto=webp&s=da1384cfbbfdebc57c2bd4d99080fd7428e08ff7')`,
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
                  <h2 className="fw-bold mb-2 text-center">Inicia sesión como empleado</h2>
                  <br />
                  <form style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                  <MDBInput wrapperClass='mb-3 w-100 rounded shadow' placeholder='Correo' id='formControl' value={username} onChange={(event) => setUsername(event.target.value)} type='email' size="lg" />
                  <MDBInput wrapperClass='mb-4 w-100 rounded shadow' placeholder='Contraseña' id='formControlDefault' value={cont} type='password' onChange={(event) => setCont(event.target.value)} size="lg" />
                  <button
                    type="submit"
                    className={`btn btn-primary rounded shadow ${isError ? 'shake' : ''}`}
                    onClick={handleSubmit}
                    style={{ backgroundColor: 'blue', color: 'white' }}
                    disabled={loginAttempts >= 3} // Deshabilita el botón si se alcanza el límite de intentos

                  >
                      Iniciar sesión
                    </button>
                  </form>
                  <hr className="my-4" />
                  <h6 style={{ textAlign: "center" }}>¿Eres una empresa? Pincha <Link to="/loginempresa">aquí</Link></h6>

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
export default Login;