import "./HomePage.scss";
import VideoHomePage from "../../assets/video-homepage.mp4";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isColor, setColor] = useState(false);

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
        <div className="title-one">
          <h1 style={{ color: isColor ? "black" : "RGB(255, 182, 193)" }}>
            Make forms worth filling out
          </h1>
        </div>
        <div className="title-tow">
          <span>
            Get more data—like signups, feedback, and anything else—with forms
            designed to be refreshingly different.
          </span>
          <div className="title-3">
            <button>Get started—it's free</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
