import React, { useState, useEffect, useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import { IoIosRefresh } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import Movie from "./Movie";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext";
const Emotion = () => {
  const [status, setStatus] = useState("Initializing...");
  const [detectedEmotion, setDetectedEmotion] = useState("");
  const [movie, setmovie] = useState(null);
    const Navigate=useNavigate();
  const [loading, setloading] = useState(true);
  const {setauthlogin}=useAuthContext();
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const isFetching = useRef(false);
  const streamRef = useRef(null); // To manage the webcam stream

  
  useEffect(() => {
    const handleUnload = () => {
      console.log("Popup is closing. Stopping webcam...");
      stopWebcam();
    };
    chrome.storage.local.get(["moviedata"], (result) => {
      if (result.moviedata) {
        setloading(false);
        setmovie(result.moviedata);
      }
    });

    startWebcam();
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      stopWebcam();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const stopWebcam = () => {
    clearInterval(intervalRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };
  

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
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

        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

        const data = await response.json();
        if (data.emotion) {
          setDetectedEmotion(data.emotion);
          setmovie(data.movies);
        }
      } catch (error) {
        console.error("Error sending frame to API:", error);
      } finally {
        isFetching.current = false;
      }
    }, 200);
  };

  const Handlerec = () => {
    if (!detectedEmotion) {
      return toast.error("No Emotion Detected", {
        style: {
          background: "transparent",
          color:"red",
          boxShadow: "none", 
          marginTop: "10px", 
        },
      });

    }else{
    setloading(false);
    stopWebcam(); }
  };

  const handleRefresh = () => {
    stopWebcam();
    setDetectedEmotion("");
    setmovie(null);
    setloading(true);
    setStatus("Reinitializing...");
    startWebcam();
  };
  
  const Handlelogout=()=>{
    chrome.storage.local.remove("authUser", () => {
      setauthlogin(false);
     });
     Navigate("/signin");
  }
  return (
    <div className="container">
      {loading ? (
        <>
          <div className="mood">MoodVEE</div>
          <div id="webcam-container">
            <video ref={videoRef} id="video" autoPlay playsInline style={{ width: "100%" }} />
          </div>
          <div id="status">{status}</div>
          <div id="detected-emotion">
            <h3 id="detected">Detected Emotion: {detectedEmotion.toUpperCase()}</h3>
          </div>
          <div style={{alignItems:"center"}} className="actions">
       <BsArrowRight style={{left:"120px"}} className="SignupArrow2" onClick={Handlerec} />
       <button className="logout" onClick={Handlelogout} ><TbLogout style={{background: "none",fontSize: "larger"}} /></button>
       <button onClick={handleRefresh} style={{ position:"relative", right:"35px",bottom:"10px",paddingLeft:"5px",paddingRight:"5px" }}><IoIosRefresh style={{background:"none",fontSize:"larger"}} /></button>
          </div>
        </>
      ) : (
        <Movie movie={movie} />
      )}
    </div>
  );
};

export default Emotion;
