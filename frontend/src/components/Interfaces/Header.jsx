import { Row } from "react-bootstrap";
import logo_factor_rh from '../../assets/logo.jpg';
 

const Header = (props) => {

  return (

    <div id="cabecera" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "auto" }}>
      <Row>
      <img className="logo" src={logo} style={{ display: "flex", justifyContent: "right", alignContent: "centre", height: "100px", width: "220px" }}  onClick={handleIMG} alt="logo" />

      </Row>
    </div>)
}

export default Header;