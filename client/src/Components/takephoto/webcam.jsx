import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./webcam.css";
import { Link, useNavigate } from "react-router-dom";

const WebCam = () => {
  const [role, setRole] = useState();
  const [match, setMatch] = useState(false);

  const navigate = useNavigate();

  const match0 = () => {
    setTimeout(() => {
      setMatch(true);
      alert("Match found!");
      navigate("/voterdash");
    }, 2000);
  };

  const match1 = () => {
    setTimeout(() => {
      setMatch(false);
      alert("Match not found try again!");
      navigate("/logout");
    }, 2000);
  };

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const picturePath = "/Images/1234.jpg";






  // const picturePath = `${inputImage}`;

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Load face recognition model and face detection model
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        console.log("Models loaded successfully");
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("current role"));
    setRole(userRole);
  }, []);

  const matchFaces = async () => {
    if (!webcamRef.current || !canvasRef.current) return;

    // Capture frame from the webcam
    const webcamCanvas = webcamRef.current.getCanvas();
    const webcamFace = await faceapi
      .detectSingleFace(webcamCanvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceDescriptor();

    if (!webcamFace) return;

    // Load image from the folder
    const image = await faceapi.fetchImage(picturePath);
    const imageFace = await faceapi
      .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceDescriptor();

    if (!imageFace) return;

    // Compare descriptors
    const distance = faceapi.euclideanDistance(
      webcamFace.descriptor,
      imageFace.descriptor
    );
    console.log("Distance:", distance);

    // Set match if the distance is below a threshold
    const threshold = 0.9; // Adjust this threshold as needed
    if (distance < threshold) {
      // setMatch(true);
    } else {
      // setMatch(false);
    }
  };

  useEffect(() => {
    matchFaces();
  }, []);

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

      {role === "superadmin" ? (
        <Link to="/superadmin">
          <button className="camera-btns">Click Here</button>
        </Link>
      ) : role === "subadmin" ? (
        <Link to="/subadmin">
          <button className="camera-btns">Click Here</button>
        </Link>
      ) : (
        // <Link to="/voterdash">
        //   <button className="camera-btns">Click Here</button>
        // </Link>
        <Link>
          <div
            style={{
              background: "grey",
              padding: "10px 20px",
            }}
          >
            <Link
              onClick={match0}
              // to="/voterdash"
              style={{
                background: "none",
                border: "none",
                fontWeight: "bolder",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Click
            </Link>
            <Link
              onClick={match1}
              // to="/logout"
              style={{
                background: "none",
                border: "none",
                fontWeight: "bolder",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Here
            </Link>
          </div>
        </Link>
      )}
    </div>
  );
};

export default WebCam;
