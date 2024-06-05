import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./SideBar.scss";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { Link } from "react-router-dom";
const SideBar = (props) => {
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
          <SubMenu icon={<MdDashboard />} label="Tính Năng">
            <MenuItem lassName="title">
              <Link className="link-to" to={"/admins/manage-users"}>
                <FaUser /> Quản Lí User{" "}
              </Link>
            </MenuItem>
            <MenuItem className="title">
              <Link className="link-to" to={"/admins/manage-quizzes"}>
                <MdQuiz /> Quản Lí Bài Quiz
              </Link>
            </MenuItem>
            <MenuItem className="title">
              <Link className="link-to" to={"/admins/manage-questions"}>
                <MdQuiz /> Quản Lí Câu Hỏi
              </Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
