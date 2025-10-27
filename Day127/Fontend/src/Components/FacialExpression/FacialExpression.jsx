import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import style from "./FacialExpression.module.scss";
import axios from 'axios';
// import '@tensorflow/tfjs-node';

export default function FacialExpression({ setSongs}) {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");

  const loadModels = async () => {
    const MODEL_URL = "/models";

    try {
      // ✅ set backend properly
      await faceapi.tf.setBackend("webgl");
      // await faceapi.tf.ready();
    console.log("✅ Using backend:", faceapi.tf.getBackend());
    } catch (err) {
      console.warn("⚠️ WebGL failed, switching to CPU...");
      await faceapi.tf.setBackend("cpu");
      // await faceapi.tf.ready();
    }

    // ✅ load models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);

    console.log("✅ Models loaded successfully");
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    if (!videoRef.current || videoRef.current.readyState < 2) {
      console.warn("⚠️ Video not ready yet");
      return;
    }

    try {
      const detections = await faceapi
        .detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 416,
            scoreThreshold: 0.5,
          })
        )
        .withFaceExpressions();

      if (!detections || detections.length === 0) {
        console.log("No face detected ❌");
        setExpression("No face detected");
        return;
      }

      // ✅ Find top expression
      const exprs = detections[0].expressions;
      const top = Object.keys(exprs).reduce((a, b) =>
        exprs[a] > exprs[b] ? a : b
      );

      console.log("😃 Expression:", top);
      setExpression(top);

      // ✅ Send mood to backend
      const response = await axios.get(
        `http://localhost:3000/songs?mood=${top}`
      );
      console.log("🎵 Songs:", response.data);
    } catch (err) {
      console.error("❌ Detection error:", err);
    }
  }

  useEffect(() => {
    loadModels().then(() => {
      console.log("✅ Backend:", faceapi.tf.getBackend());
      startVideo();

      videoRef.current.addEventListener("play", () => {
        console.log("🎥 Video started — width:", videoRef.current.videoWidth);
        // detectMood();
      });
    });

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
    </div>
  );
}
