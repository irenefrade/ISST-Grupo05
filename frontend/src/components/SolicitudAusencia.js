import { useNavigate } from 'react-router-dom';
import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default function SolicitudAusencia() {

    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-outline-primary" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    return (
        <div style={styles.mesh}>
            <div style={styles.grid}>
                <div style={styles.option}>
                    <h1>Solicitud de Ausencia</h1>
                    <p style={{margin: 10, fontSize: "1.2em"}}><b>Fecha Inicio</b></p>
                    <DatePicker 
                        style={styles.date}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        customInput={<CustomInput />}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <p style={{margin: 10, fontSize: "1.2em"}}><b>Fecha Fin</b></p>
                    <DatePicker 
                        style={styles.date}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        customInput={<CustomInput />}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                    <p style={{margin: 10, fontSize: "1.2em"}}><b>Categoría</b></p>
                    <select style={styles.select}>
                        <option value="1">Vacaciones</option>
                        <option value="2">Permiso</option>
                        <option value="3">Enfermedad</option>
                    </select>
                    <p style={{margin: 10, fontSize: "1.2em"}}><b>Título</b></p>
                    <input type="text" placeholder="Título" style={styles.title}/>
                    <p style={{margin: 10, fontSize: "1.2em"}}><b>Descripción</b></p>
                    <textarea placeholder="Descripción" style={styles.desc}/>
                    <button className='btn btn-success' style={styles.button} onClick={() => {navigate("/ausencias")}}>Generar Solicitud</button>
                    <button className='btn btn-danger' style={styles.button} onClick={() => {navigate("/ausencias")}}>Cancelar</button>
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
        width: "50%",
        height: "5vh",
        margin: "1vh",
        fontSize: "1.2em",
    },
    select: {
        height: "4vh",
        width: "100%",
        margin: "1vh",
        fontSize: "1em",
        borderRadius: 6,
    },
    title: {
        height: "4vh",
        width: "100%",
        margin: "1vh",
        fontSize: "1em",
        borderRadius: 6,
    },
    desc: {
        height: "10vh",
        width: "100%",
        margin: "1vh",
        fontSize: "1em",
        borderRadius: 6,
    },
    date: {
        height: "4vh",
        width: "100%",
        margin: "1vh",
        fontSize: "1em",
        borderRadius: 6,
    }
}