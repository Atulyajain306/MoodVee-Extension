import React from 'react';
import { RiMovieLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../context/Authcontext';
import { useEffect } from 'react';
const Movie = ({movie}) => { 
       const {setauthlogin}=useAuthContext();
       const [newmovies, setnewmovies] = useState()
       const Navigate=useNavigate();
      
    useEffect(() => {
      chrome.storage.local.get(["moviedata"],(result)=>{
        if(result.moviedata){
           setnewmovies(result.moviedata);
           console.log("newmovies",result.moviedata);
        }
    }) 
        chrome.storage.local.remove("authUser", () => {
            setauthlogin(null); })
            chrome.storage.local.set({ moviedata: movie }, function () {
                setauthlogin(movie); 
              });      
                  
    }, []);
     const Handlelogout=()=>{
      chrome.storage.local.remove("moviedata", () => {
        setauthlogin(false);
       });
       Navigate("/signin");
     }
 return (
  <div className="movie-container" onClick={(e) => e.stopPropagation()}>
  <div className="mood">MoodVEE</div>
  <div className="register" style={{ fontSize: "x-large" }}>Recommendations</div>

  {Array.isArray(movie) && movie.length > 0 ? (
    <div className="movie-list">
      {movie.map((mv, idx) => (
        <div key={idx} className="movie-item">
          <RiMovieLine className="RiMovieLine" style={{ color: "#632E55" }} />
          <div className="name">{mv.name}</div>
          <a
            href={mv.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <FaArrowRight style={{ color: "white" }} className="link" />
          </a>
        </div>
      ))}
    </div>
  ) : Array.isArray(newmovies) && newmovies.length > 0 ? (
    <div className="movie-list">
      {newmovies.map((mv, idx) => (
        <div key={idx} className="movie-item">
          <RiMovieLine className="RiMovieLine" style={{ color: "#632E55" }} />
          <div className="name">{mv.name}</div>
          <a
            href={mv.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <FaArrowRight style={{ color: "white" }} className="link" />
          </a>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-movies">No movies found</p>
  )}

  <button
    className="logout"
    style={{ position: "relative", bottom: "1px" }}
    onClick={Handlelogout}
  >
    <TbLogout style={{ background: "none", fontSize: "larger" }} />
  </button>
</div>

 );
};

export default Movie;
