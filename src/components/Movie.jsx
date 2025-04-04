import React from 'react';
import { RiMovieLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { useAuthContext } from '../context/Authcontext';
import { useEffect } from 'react';
const Movie = ({movie}) => { 
       const {setauthlogin}=useAuthContext();
    useEffect(() => {
        chrome.storage.local.remove("authUser", () => {
            setauthlogin(null); })
            chrome.storage.local.set({ moviedata: movie }, function () {
                setauthlogin(movie); 
              }); 
                  
    }, []);
     
  return (
    <div className="movie-container"  onClick={(e) => e.stopPropagation()}>
      <div className="mood">MoodVEE</div>
      <div className="register" style={{ fontSize: "x-large" }}>Recommendations</div>

      {movie.length === 0 ? (
        <p className="no-movies">No movies found</p>
      ) : (
        <div className="movie-list">
          {movie.map((mv, idx) => (
            <div key={idx} className="movie-item">
              <RiMovieLine className="RiMovieLine" />
              <div className="name">{mv.name}</div>
              <a 
                href={mv.link} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevents closing popup if inside a modal
              >
                <FaArrowRight className="link" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movie;
