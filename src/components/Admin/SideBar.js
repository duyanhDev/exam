import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./SideBar.scss";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const SideBar = (props) => {
  const { t } = useTranslation();
  return (
    <div className="Sidebar">
      <Sidebar
        className={`sidebar ${
          props.collapsed
            ? "ps-collapsed"
            : "ps-sidebar-root nav-sidebar css-1wvake5"
        }`}
      >
        <Menu>
          <div className="name-title">
            <Link to={"/"} className="link-title">
              F8
            </Link>
          </div>
          <MenuItem>
            {" "}
            <Link className="link-to" to="/admins">
              Dashboar{" "}
            </Link>
          </MenuItem>
          <MenuItem> Calendar </MenuItem>
          <SubMenu icon={<MdDashboard />} label={t("dash.setting")}>
            <MenuItem lassName="title">
              <Link className="link-to" to={"/admins/manage-users"}>
                <FaUser /> {t("dash.user")}
              </Link>
            </MenuItem>
            <MenuItem className="title">
              <Link className="link-to" to={"/admins/manage-quizzes"}>
                <MdQuiz /> {t("dash.quiz")}
              </Link>
            </MenuItem>
            <MenuItem className="title">
              <Link className="link-to" to={"/admins/manage-questions"}>
                <MdQuiz /> {t("dash.ans")}
              </Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
