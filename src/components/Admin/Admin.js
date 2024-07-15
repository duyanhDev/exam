import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Langue from "../Header/Langue";
import { useSelector } from "react-redux";
import { doLogout } from "../../redux/action/useAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../services/apiService";
import { useTranslation, Trans } from "react-i18next";
import Profile from "../User/Profile/Profile";
const Admin = (props) => {
  const [collapsed, setcollapsed] = useState(false);
  const [isCheckProfile, setIsCheckProfile] = useState(false);
  const account = useSelector((state) => state.user.accout);
  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleDologout = async () => {
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
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setcollapsed(!collapsed)}>
            {" "}
            <FaBars className="leftside" />
          </span>

          <div className="rightside">
            <Langue />
            <NavDropdown
              title={account.username}
              id="basic-nav-dropdown"
              // onClick={() =>
              //   navigate(`/profile/${account.username}`, {
              //     state: { account: account },
              //   })
              // }
            >
              <NavDropdown.Item onClick={() => setIsCheckProfile(true)}>
                {t("admin.Profile")}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleDologout()}>
                {t("admin.Logout")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
        <Profile isCheckProfile={isCheckProfile} setShow={setIsCheckProfile} />
      </div>
    </div>
  );
};

export default Admin;
