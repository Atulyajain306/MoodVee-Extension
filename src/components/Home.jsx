import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
const Home = () => {
   

  return (
    <div className="container">
        <img className="img" src="/images/204e5b13662c18f1cd22f468cc15019e.jpeg" alt="" />
        <div className="mood">MoodVEE</div>
        <Link to="/signin"  className="signin">Sign In</Link>
        <Link to="/signup"  className="signup">Sign Up</Link>
       </div> )
}

export default Home