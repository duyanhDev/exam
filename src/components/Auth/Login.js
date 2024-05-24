import { useState } from "react";
import { FaEye } from "react-icons/fa";
import "./Login.scss";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const handelShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login-container">
      <div className="header ">Don't have an account yet ?</div>
      <div className="title col-4 mx-auto">Duy Anh IT</div>
      <div className="welcome col-4 title mx-auto">Hello , who's this</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? "password" : "text"}
            className="form-control password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <div
            className={`eye-password ${showPassword ? "show-password" : ""}`}
            onClick={handelShowPassword}
          >
            <FaEye />
          </div>
        </div>
        <span className="forgot-password">Forgot password</span>
        <div>
          <button className="btn-sumbit">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
