import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import homeImage1 from "../img/home-img.png";

function Header() {
  return (
    <Navbar
      className="navigator"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
    >
      <Container>
        <Link to="/">
          <Navbar.Brand>

            <button className="home-button" >
              육아체크
            </button>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/predict">
              <button className="predict-button ms-5 me-5">성장예측</button>
            </Link>

            <Link to="/check">
              <button className="check-button ms-5 me-5">성장현황</button>
            </Link>
            
            

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;