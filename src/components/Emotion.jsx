import React, { useState, useEffect, useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import Movie from "./Movie";

const Emotion = () => {
  const [status, setStatus] = useState("Initializing...");
  const [detectedEmotion, setDetectedEmotion] = useState("");
  const [movie, setmovie] = useState(null);
  const [loading, setloading] = useState(true);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const isFetching = useRef(false);

  useEffect(() => {
    chrome.storage.local.get(["moviedata"], (result) => {
      if (result.moviedata) {
          setloading(false);
          const r=result.moviedata
          console.log(r);
          setmovie(r);
          if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          } 
      } else {
           
      } 
  });     
    let stream= null
    const startWebcam = async () => {
      try {
         stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
    let duration = 10000; 
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
         console.log(data)
        if (data.emotion) {
          setDetectedEmotion(data.emotion);
          console.log(data.movies);
          setmovie(data.movies);
        }
      } catch (error) {
        console.error("Error sending frame to API:", error);
      } finally {
        isFetching.current = false;
      }
    }, 200);
  };
   const Handlerec=()=>{
        if(!detectedEmotion){
          return ;
        }
        setloading(false);
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }       
   }
  return (
    <div className="container">
   {loading  ? <> <div className="mood">MoodVEE</div>
      <div id="webcam-container">
        <video ref={videoRef} id="video" autoPlay playsInline style={{ width: "100%" }} />
      </div>
      <div id="status">{status}</div>
      <div id="detected-emotion">
        <h3 id="detected">Detected Emotion: {detectedEmotion.toUpperCase()}</h3>
      </div>
       <BsArrowRight className='SignupArrow2' onClick={Handlerec} /></> : < Movie movie={movie} />}   
    </div>
  );
};

export default Emotion;
