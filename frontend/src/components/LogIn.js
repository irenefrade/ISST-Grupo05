import {useNavigate} from 'react-router-dom';

export default function LogIn() {

    const navigate = useNavigate();


    return (
        <div style={styles.mesh}>
            <div style={styles.card}>
                <h1>Iniciar Sesión</h1>
                <input type="mail" placeholder='Usuario' style={styles.input} />
                <input type="password" placeholder='Contraseña' style={styles.input} />
                <button className='btn btn-secondary' onClick={() => {navigate("/home")}}>Iniciar Sesión</button>
            </div>
        </div>
    );
}

const styles = {
    mesh: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)'
    },
    input:{
        marginBottom: '1vh',
        borderRadius: 6
    }
}