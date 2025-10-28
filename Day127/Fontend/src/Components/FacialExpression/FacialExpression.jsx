import { useEffect, useRef, useState } from "react";
// explicit single tf instance
import * as tf from "@tensorflow/tfjs";
// use the maintained fork (compatible with modern tfjs)
import * as faceapi from "@vladmandic/face-api";
import style from "./FacialExpression.module.scss";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("");
  const detectIntervalRef = useRef(null);

  const loadModels = async () => {
    const MODEL_URL = "/models";

    try {
      try {
        // ✅ set backend properly
        await tf.setBackend("webgl");
        // await tf.ready();
        await tf.ready();
        console.log("✅ tf backend:", tf.getBackend());
      } catch (err) {
        console.warn("⚠️ WebGL failed, switching to CPU...", err);
        await tf.setBackend("cpu");
        await tf.ready();
        console.log("✅ tf backend now:", tf.getBackend());
      }

      // ✅ load models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      console.log("✅ Models loaded successfully");
    } catch (err) {
      console.error("❌ loadModels error:", err);
      throw err;
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // ensure the video element actually plays
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const detectMoodOnce = async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      // not enough data
      return;
    }

    try {
      const detections = await faceapi
        .detectAllFaces(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 416,
            scoreThreshold: 0.5,
          })
        )
        .withFaceExpressions();

      if (!detections || detections.length === 0) {
        setExpression("No face detected");
        return;
      }

      const exprs = detections[0].expressions || {};
      const top = Object.keys(exprs).reduce((a, b) =>
        exprs[a] > exprs[b] ? a : b
      );
      setExpression(top);
      console.log("😃 Expression:", top);

      try {
        const resp = await axios.get(`http://localhost:3000/songs?mood=${top}`);
        console.log("🎵 Songs:", resp.data);
        if (setSongs)
          setSongs(resp.data && resp.data.songs ? resp.data.songs : []);
      } catch (err) {
        console.warn("Could not fetch songs:", err);
      }
    } catch (err) {
      console.error("❌ Detection error:", err);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await loadModels();
        if (!mounted) return;
        await startVideo();

        // once video is playing, poll for detections (or use requestAnimationFrame)
        const onPlay = () => {
          // clear any previous interval
          if (detectIntervalRef.current)
            clearInterval(detectIntervalRef.current);
          // detect every 600 ms (adjust as needed)
          detectIntervalRef.current = setInterval(detectMoodOnce, 600);
          console.log("🎥 Video started — polling for detections");
        };

        videoRef.current?.addEventListener("play", onPlay);

        return () => {
          mounted = false;
          videoRef.current?.removeEventListener("play", onPlay);
          if (detectIntervalRef.current) {
            clearInterval(detectIntervalRef.current);
            detectIntervalRef.current = null;
          }
          // stop camera tracks
          const stream = videoRef.current?.srcObject;
          if (stream && stream.getTracks) {
            stream.getTracks().forEach((t) => t.stop());
          }
        };
      } catch (err) {
        console.error("Init failed:", err);
      }
    })();
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
          <p>
            Your current mood is being analyzed in real-time. Enjoy music
            tailored to your feelings.
          </p>
          <button onClick={detectMoodOnce}>Detect</button>
        </div>
      </div>
    </div>
  );
}
