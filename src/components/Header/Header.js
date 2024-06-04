import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "./Header.scss";
import { logout } from "../../services/apiService";
import { doLogout } from "../../redux/action/useAction";
import Langue from "./Langue";

function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.accout);

  const handleLogout = async () => {
    let res = await logout(account.email, account.refresh_token);

    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary nav">
        <Container>
          <Link to="/" className="navbar-brand">
            IELTS Online Tests
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
                  <NavDropdown
                    title="Setting"
                    // <img
                    //   src={`data:image/jpeg;base64,${account.image}`}
                    //   alt="Setting"
                    //   className="nav-image"
                    // />

                    id="basic-nav-dropdown"
                  >
                    <div className="item-drop">
                      <NavDropdown.Item>
                        <button className="btn-user" onClick={handleLogin}>
                          {account.username}
                        </button>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        style={{ textAlign: "center" }}
                        href="#action/3.4"
                        onClick={() =>
                          navigate(`/profile/${account.username}`, {
                            state: { account: account },
                          })
                        }
                      >
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />

                      <NavDropdown.Item>
                        <button className="btn-user" onClick={handleLogout}>
                          Logout
                        </button>
                      </NavDropdown.Item>
                    </div>
                  </NavDropdown>
                </>
              )}

              <Langue />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
