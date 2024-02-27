import { useRef } from "react";
import Webcam from "react-webcam";
import "./webcam.css";
import { Link } from "react-router-dom";

const WebCam = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div className="webCam container align-items-center">
      <Webcam
        className="camera"
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
      />
      <canvas
        className="image col-md-6"
        ref={canvasRef}
        style={{ display: "none" }}
        height={600}
      />
      <Link to="/superadmin/dashboard">
        <button className="camera-btns">Click Me</button>
      </Link>
    </div>
  );
};

export default WebCam;
