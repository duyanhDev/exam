import "./Regiter.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postResigister } from "../../services/apiService";
import { toast } from "react-toastify";
import video from "../../assets/144742-785265007_large.mp4";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usename, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
  const hadleSingUp = async () => {
    let res = await postResigister(email, usename, password);
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Email không hợp lệ");
      return;
    }

    if (!password) {
      toast.error("Vui lòng nhập password");
      return;
    }
    if (!usename) {
      toast.error("Vui lòng nhập username");
      return;
    }
    try {
      if (res.EC === 0) {
        toast.success(res.EM);
        navigate("/login");
      } else {
        toast.error(res.EC);
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
      <div className="header">Don't have an account yet? </div>
      <div className="title col-4 mx-auto">Duy Anh</div>
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
            <div className="eye-password" onClick={handleShowPassword}>
              <FaEye />
            </div>
          ) : (
            <div className="eye-password" onClick={handleShowPassword}>
              <FaEyeSlash />
            </div>
          )}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="email"
            className="form-control"
            value={usename}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <button className="btn-submit" onClick={hadleSingUp}>
            Sign Up
          </button>
        </div>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
          Go back
        </span>
      </div>
    </div>
  );
};

export default Register;
