import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import style from "./FacialExpression.module.scss";
import Songs from "../Songs/Songs.jsx";

export default function FacialExpression() {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");

  const loadModels = async () => {
    const MODEL_URL = "/models";

    // ✅ set backend first
    await faceapi.tf
      .setBackend("webgl")
      .catch(() => faceapi.tf.setBackend("cpu"));
    await faceapi.tf.ready();

    // then load models
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 416, // default 224 — bigger = better detection
          scoreThreshold: 0.5,
        })
      )
      .withFaceExpressions();

    // ✅ fix: check if any face is detected
    if (!detections || detections.length === 0) {
      console.log("No face detected ❌");
      return;
    }
    let mostProableExpression = "";
    let highestScore = 0;

    for (const expression of Object.keys(detections[0].expressions)) {
      const score = detections[0].expressions[expression];
      if (score > highestScore) {
        highestScore = score;
        mostProableExpression = expression;
      }
    }

    console.log(mostProableExpression);
    setExpression(mostProableExpression);
  }

  useEffect(() => {
    loadModels().then(() => {
      console.log(
        "✅ Models loaded:",
        faceapi.nets.tinyFaceDetector.isLoaded,
        faceapi.nets.faceExpressionNet.isLoaded
      );

      console.log("✅ Backend:", faceapi.tf.getBackend());
      startVideo();

      videoRef.current.addEventListener("play", () => {
        console.log("🎥 Video started — width:", videoRef.current.videoWidth);
        // detectMood();
      });
    });

    console.log("Video width:", videoRef.current.videoWidth);
    console.log("Models loaded:", faceapi.nets.tinyFaceDetector.isLoaded);

    console.log("Backend:", faceapi.tf.getBackend());
  }, []);
  return (
    <div className={style.screen}>
      <h2 className={style.header}>Live Mood Detection</h2>

      <div className={style.mainContainer}>
        <video ref={videoRef} autoPlay muted />
        <div className={style.texts}>
          <h2
          style={{
            color: "rgba(1, 161, 161, 1)",
          }}
        >
          {expression || "Detecting..."} {/* ✅ display dynamically */}
        </h2>
        <p>Your current mood is being analyzed in real-time. Enjoy music tailored to your feelings.</p>
      <button onClick={detectMood}>Detect</button>
        </div>
      </div>
      <Songs />
    </div>
  );
}
