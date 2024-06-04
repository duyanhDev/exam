import { useEffect, useState } from "react";

const CoutDown = (props) => {
  const [count, setCount] = useState(300);

  useEffect(() => {
    if (count === 0) {
      props.onTimeup();
      return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);
  // render 1 lần

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  // timer 1
  return (
    <div className="coutdown-container">
      <span>{toHHMMSS(count)}</span>
    </div>
  );
};

export default CoutDown;
