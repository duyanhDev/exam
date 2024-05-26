import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.scss";
import { postLoginUser } from "../../services/apiService";
import { toast } from "react-toastify";
import video from "../../assets/144742-785265007_large.mp4";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/useAction";
import { ImSpinner10 } from "react-icons/im";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
    try {
      const isValidEmail = validateEmail(email);

      if (!isValidEmail) {
        toast.error("Email không hợp lệ");
        return;
      }

      if (!password) {
        toast.error("Vui lòng nhập password");
        return;
      }
      setIsLoading(true);
      let res = await postLoginUser(email, password);
      if (res.EC === 0) {
        dispatch(doLogin(res));
        toast.success(res.EM);
        setIsLoading(false);
        navigate("/");
      } else {
        toast.error(res.EM || "Login failed");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <video width="500px" autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
      <div className="container-main">
        <div className="header">
          Don't have an account yet?{" "}
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
        <div className="title col-4 mx-auto">Duy Anh </div>
        <div className="welcome col-4 title mx-auto">Hello, who's this</div>
        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "password" : "text"}
              className="form-control password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <div className={`eye-password`} onClick={handleShowPassword}>
                <FaEye />
              </div>
            ) : (
              <div className={`eye-password`} onClick={handleShowPassword}>
                <FaEyeSlash />
              </div>
            )}
          </div>
          <span className="forgot-password">Forgot password</span>
          <div>
            <button
              className="btn-submit"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading === true && <ImSpinner10 className="loader-icon" />}
              <span> Login</span>
            </button>
          </div>

          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Go back
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
