import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popup from 'reactjs-popup';

export default function Horarios() {

    const navigate = useNavigate();

    return (
        <div style={styles.mesh}>
            <div style={styles.header}>
                <h1>Horarios</h1>
            </div>
            <div style={styles.view}>
                <div style={styles.option}>
                    <Popup trigger={<button className='btn btn-primary'>Ver Mi Horario</button>} modal nested>
                        {close => (
                            <div style={styles.popup}>
                                <div style={styles.popupText}>
                                    <h2>Tu Horario</h2>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Hora de Entrada:</b></p>
                                        <input type="time" style={{borderRadius: 6}}></input>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Hora de salida:</b></p>
                                        <input type="time" style={{borderRadius: 6}}></input>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Tiempo Descansando:</b></p>
                                        <p style={{margin: 10}}>tiempo descansando</p>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Horas Trabajadas:</b></p>
                                        <p style={{margin: 10}}>horas trabajadas</p>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Horas Extra:</b></p>
                                        <p style={{margin: 10}}>horas extra</p>
                                    </div>

                                    <button className='btn btn-danger' onClick={close}>Cerrar</button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
            <div style={styles.grid}>
                <div style={styles.option}>
                    <div style={styles.rows}>
                        <p style={{margin: 10}}><b>Nombre del Empleado</b></p>
                        <Popup trigger={<button className='btn btn-outline-primary'>Ver Horario</button>} modal nested>
                        {close => (
                            <div style={styles.popup}>
                                <div style={styles.popupText}>
                                    <h2>Horario del Empleado</h2>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Hora de Entrada:</b></p>
                                        <p style={{margin: 10}}>hora de entrada</p>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Hora de salida:</b></p>
                                        <p style={{margin: 10}}>hora de salida</p>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Tiempo Descansando:</b></p>
                                        <p style={{margin: 10}}>tiempo descansando</p>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Horas Trabajadas:</b></p>
                                        <p style={{margin: 10}}>horas trabajadas</p>
                                    </div>
                                    <div style={styles.rows}>
                                        <p style={{margin: 10}}><b>Horas Extra:</b></p>
                                        <p style={{margin: 10}}>horas extra</p>
                                    </div>

                                    <button className='btn btn-danger' onClick={close}>Cerrar</button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    </div>
                </div>
            </div>
            

            <div style={styles.back}>
                <button className='btn btn-success' style={styles.button} onClick={() => {navigate("/home")}}>Volver al Menú</button>
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
        width: '60vw',
        padding: '20px',
        margin: '10px'
    },
    button: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "5vh",
        margin: "1vh",
        fontSize: "1.3em",
    },
    back: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "space-evenly",
        alignItems: "center",
        margin: "auto",
        width: "20%",
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translate(-50%, -100%)"
    },
    rows: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        padding: '10px',
        width: '100%',
        margin: '10px'
    },
    popup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    popupText: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '70vw',
        height: '75vh',
        maxWidth: '800px',
        maxHeight: '580px',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    view: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}