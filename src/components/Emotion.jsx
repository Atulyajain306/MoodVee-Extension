import React, { useState, useEffect, useRef } from "react";

const Emotion = () => {
  const [status, setStatus] = useState("Initializing...");
  const [detectedEmotion, setDetectedEmotion] = useState("");
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus("Webcam is active. Detecting emotions...");
        startEmotionDetection();
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setStatus(`Error: ${err.message}`);
      }
    };

    startWebcam();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startEmotionDetection = () => {
    let duration = 15000; // Stop after 15 seconds
    let startTime = Date.now();

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || isFetching.current) return;
      if (Date.now() - startTime > duration) {
        clearInterval(intervalRef.current);
        setStatus("Emotion detection stopped.");
        return;
      }

      isFetching.current = true;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const base64Image = canvas.toDataURL("image/jpeg").split(",")[1];

      try {
        const response = await fetch("http://localhost:5000/detect_emotion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.emotion) {
          setDetectedEmotion(data.emotion);
        }
      } catch (error) {
        console.error("Error sending frame to API:", error);
      } finally {
        isFetching.current = false;
      }
    }, 500);
  };

  return (
    <div className="container">
      <div className="mood">MoodVEE</div>
      <div id="webcam-container">
        <video ref={videoRef} id="video" autoPlay playsInline style={{ width: "100%" }} />
      </div>
      <div id="status">{status}</div>
      <div id="detected-emotion">
        <h3 id="detected">Detected Emotion: {detectedEmotion.toUpperCase()}</h3>
      </div>
    </div>
  );
};

export default Emotion;
