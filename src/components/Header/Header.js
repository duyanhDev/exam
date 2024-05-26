import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/useAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.scss";
function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.accout);

  const handleLogout = () => {
    dispatch(doLogout());
    navigate("/login");
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary nav">
        <Container>
          <Link to="/" className="navbar-brand">
            Duy Anh
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
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={handleLogin}>
                    Login
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <button className="btn-login" onClick={handleLogin}>
                    {account.username}
                  </button>
                  <button className="btn-signup" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
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
