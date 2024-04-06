import { useNavigate } from 'react-router-dom';


export default function Home() {

    const navigate = useNavigate();

    return (
        <div style={styles.mesh}>
            <div style={styles.header}>
                <h1>Bienvenido a Factor RH</h1>
            </div>
            <div style={styles.view}>
                <button className='btn btn-link' onClick={() => navigate("/")}>Logout</button>
            </div>
            <div style={styles.grid}>
                
                <div style={styles.option}>
                    <button className='btn btn-outline-dark' style={styles.button} onClick={() => {navigate("/horarios")}}>Control de Horarios</button>
                    <button className='btn btn-outline-dark' style={styles.button} onClick={() => {navigate("/ausencias")}}>Control de Ausencias</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    mesh:{
        height: "100vh",
        width: "100vw",
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
    },
    grid: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "space-evenly",
        alignItems: "center",
        margin: "auto",
        width: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    option: {
        gridArea: 'main',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        width: '60vw',
        padding: '20px',
    },
    button: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "10vh",
        margin: "1vh",
        fontSize: "1.5em",
    },
    view: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}