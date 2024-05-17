import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.scss";
function Header() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary nav">
        <Container>
          <Link to="/" className="navbar-brand">
            Duy Anh IT
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link ">
                Home
              </Link>
              <Link to="/users" className="nav-link ">
                Users
              </Link>
              <Link to="/admins" className="nav-link  ">
                Admin
              </Link>
            </Nav>

            <Nav>
              <button className="btn-login">Login</button>
              <button className="btn-signup">Sign up</button>
              {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Profile</NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
