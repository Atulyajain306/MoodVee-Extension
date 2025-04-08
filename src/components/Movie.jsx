import React from 'react';
import { RiMovieLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdOutlineArrowBack } from "react-icons/md";
import { useAuthContext } from '../context/Authcontext';
import { useEffect } from 'react';
import "./style.css"
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
       localStorage.removeItem("item");
      chrome.storage.local.remove("moviedata", () => {
        setauthlogin(false);
       });
       Navigate("/signin");
     }
 
     const Handleback=()=>{
      chrome.storage.local.remove("moviedata", () => {
       });
        let data= JSON.parse(localStorage.getItem("item"));
       chrome.storage.local.set({ authUser:data }, function () {
        setauthlogin(true); 
      }); 
      Navigate("/emotion") 
     }

 return (
  <div  className="container" onClick={(e) => e.stopPropagation()}>
  <div className="mood" style={{marginTop:"70px"}}>MoodVEE</div>
  <div className="register" style={{ fontSize: "x-large",marginBottom:"5px" }}>Recommendations</div>

  {Array.isArray(movie) && movie.length > 0 ? (
    <div  className="movie-list">
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
    <div  className="movie-list">
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
  <div  style={{position:"relative",right:"90px",bottom: "5px",
  fontSize: "30px"}} className='Backward' onClick={Handleback} > <MdOutlineArrowBack className='newlink' /></div> 
  <button
    className="logout"
    style={{ position: "relative", bottom: "65px",left:"90px" }}
    onClick={Handlelogout}
  >
    <TbLogout style={{ background: "none", fontSize: "larger" }} />
  </button>
  <div style={{color:"#F7374F",position:"relative",fontStyle:"italic",left:"89px",bottom:"69px"}} >Logout</div>
</div>

 );
};

export default Movie;
