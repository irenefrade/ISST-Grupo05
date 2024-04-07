import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Liner from '../Interfaces/Liner';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import { LoginContext } from '../../App';
import { useEffect, useState, useContext } from "react";
import HorariosEmpleados from "./HorariosEmpleados";


const Horarios = (props) => {
    const navigate = useNavigate();
    const trabajadorList = props.empleados2;
    const { id } = useParams();
    const horarios = trabajadorList[id-1].horarios;

    const [filtro, setFiltro] = useState("");
    const [userLogged, setUserLogged] = useContext(LoginContext);

    let rec;
    


    


     // Función para actualizar el filtro
     const handleFilterChange = (event) => {
        setFiltro(event.target.value);
    };

    //Función de filtrado  v2
    const filteredEmpleados = trabajadorList.filter((item) =>
        item.nombreCompleto.toLowerCase().includes(filtro.toLowerCase()) || item.correoElectronico.toLowerCase().includes(filtro.toLowerCase()) 
    );

    
    useEffect(() =>{
        console.log(rec)
      }, [rec]);


    return (
        <div class="contenedor-flexbox" style={{display:"flex", flexDirection:"column", justifyContent: "center", alignContent:"center", margin:"auto"}}>
            {rec
            ?
            <div class="contenedor-flexbox" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto"}}>
                <Col>
                    <Row>
                        <Liner />
                    </Row>
                    <Col md>
                    <Row>
                        <h2 style={{justifyContent: "center", alignContent: "center", display: "flex"}}>Horarios de empleados</h2>
                    
                        <div className="funciones" style={{justifyContent: "center", alignContent: "center", display: "flex", margin: 2}}>
                            <input  type="text" id="filtro" placeholder="Filtrar por nombre o correo" value={filtro} onChange={handleFilterChange}
                                style={{alignItems:'right', width: '30rem', marginBottom:"1vh"}}></input>
                            <Link to={`/horarios/${id}`} style={{marginLeft: "1vw"}}>
                                <button className="btn btn-primary" style={{marginBottom:"1vh"}}>Ver mis Horarios</button>
                            </Link>
                        </div>
                    </Row>
                    </Col>   
                    <Row>
                        <div id="productosresultados" style={{ height: "62vh", overflowY: "auto", overflowX: "hidden" }}>
                            {filteredEmpleados.slice().reverse().map((empleadosItem) => (
                                <Row className="my-2">
                                <Card className="flex-fill">
                                    <Card.Body> 
                                        <div class="row">  
                                            <div class="col-11" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto"}}> 
                                            { <h2>{empleadosItem.nombreCompleto}</h2> }
                                            </div>
                                            <div class="col-1">
                                            <Link to={`/horarios/${empleadosItem.id}`}>
                                                <button className="btn btn-primary" style={{marginBottom:"1vh"}}>Ver horario</button>
                                            </Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                                
                                </Row>                     
                            ))}
                        </div>     
                    </Row>
                </Col>
            </div>
            :
            <Navigate to={`/horarios/${id}`}/>
            }
        </div>)
}

export default Horarios;