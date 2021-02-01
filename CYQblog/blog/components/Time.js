import Script from "react-load-script";
import "../static/style/components/time.css";

const Time = () => {
  return (
    <div className="">
      <Script url="../static/js/time.js" />
      <canvas id="myCanvas" width="250px" height="250px"></canvas>
    </div>
  );
};

export default Time;
