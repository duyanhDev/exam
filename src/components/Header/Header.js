import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./Header.scss";
import { logout } from "../../services/apiService";
import { doLogout } from "../../redux/action/useAction";
import Langue from "./Langue";
import Profile from "../User/Profile/Profile";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import f8 from "../../assets/f8-icon-lV2rGpF0.png";
function Header() {
  const navigate = useNavigate();
  // useTranslation
  const { t } = useTranslation();
  const [isCheckProfile, setIsCheckProfile] = useState(false);

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
    <>
      <Navbar expand="lg" className="bg-body-tertiary nav">
        <Container>
          <Link to="/" className="navbar-brand">
            <img className="img_f8" src={f8}></img>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link ">
                {t("menu.home")}
              </Link>
              <Link to="/users" className="nav-link ">
                {t("menu.User")}
              </Link>
              <Link to="/admins" className="nav-link  ">
                {account.role === "ADMIN" ? t("menu.Admin") : ""}
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
                    // title="Setting"
                    title={
                      <img
                        src={`data:image/jpeg;base64,${account.image}`}
                        alt="Setting"
                        className="nav-image"
                      />
                    }
                    id="basic-nav-dropdown"
                  >
                    <div className="item-drop">
                      <NavDropdown.Item>
                        <button
                          className="btn-user"
                          onClick={handleLogin}
                          disabled
                        >
                          {account.username}
                        </button>
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        style={{ textAlign: "center" }}
                        onClick={() => setIsCheckProfile(true)}
                      >
                        {t("menu.profile")}
                      </NavDropdown.Item>
                      <NavDropdown.Divider />

                      <NavDropdown.Item>
                        <button className="btn-user" onClick={handleLogout}>
                          {t("menu.Logout")}
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

      <Profile isCheckProfile={isCheckProfile} setShow={setIsCheckProfile} />
    </>
  );
}

export default Header;
