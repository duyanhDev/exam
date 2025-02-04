import "./HomePage.scss";
import VideoHomePage from "../../assets/video-homepage.mp4";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const HomePage = () => {
  // useTranslation
  const { t } = useTranslation();
  const [isColor, setColor] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const account = useSelector((state) => state.user.accout);

  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prevColor) => !prevColor);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-video">
      <video width="500px" autoPlay muted loop>
        <source src={VideoHomePage} type="video/mp4" />
      </video>

      <div className="homepage-content">
        <div className="title-one ">
          <h1 style={{ color: isColor ? "black" : "RGB(255, 182, 193)" }}>
            {t("homepage.title1")}
          </h1>
        </div>
        <div className="title-tow">
          <span>{t("homepage.title2")}</span>
          <div className="title-3">
            {isAuthenticated === false ? (
              <button onClick={() => navigate("/login")}>
                {t("homepage.title3.login")}
              </button>
            ) : (
              <button onClick={() => navigate("/users")}>
                {t("homepage.title3.start")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
