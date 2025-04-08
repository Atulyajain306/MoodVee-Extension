import React from 'react'
import {Link} from "react-router-dom"
import { PiConfetti } from "react-icons/pi";
import { MdOutlineArrowForward } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { useEffect,useState } from 'react';
import { PiConfettiThin } from "react-icons/pi";
import { useAuthContext } from '../context/Authcontext';
const Middle = () => {
       const {setauthlang,setnewstate}=useAuthContext();
       const [ww, setww] = useState(false);
        const Handleback=()=>{
              setauthlang(null);
             
        }
       const Handleforward=()=>{
        setnewstate(true);    
       } 
      const change=()=>{
          setww(!ww);
        } 

        useEffect(() => {
          
    const interval= setInterval(() => {
        change()
       }, 950);   
       return () => clearInterval(interval); 
        }, [ww])
        
  return (
    <div className='container'>
        <div style={{marginTop:"50px"}} className="mood">MoodVEE</div>
        <div className='register'>Sign Up { ww ?  <PiConfettiThin style={{fontSize:"75px",color:"white"}} className="icons" /> : <PiConfetti style={{fontSize:"75px",color:"white"}} className='icons' />} </div>
        <div className='register'>Successful</div>
        <div className='register'>Welcome to</div>
        <div className='register'>MoodVEE</div>
  <Link to="/language" onClick={Handleback} style={{position:"relative",right:"90px",bottom: "5px",fontSize: "30px"}} className='Backward' > <MdOutlineArrowBack className='newlink' /></Link>
   <Link to ="/signin" onClick={Handleforward}  style={{bottom:"69px",fontSize:"30px",alignItems:"center",paddingLeft:"17px",paddingRight:"5px",marginTop:"4px", marginRight:"20px",paddingTop:"1px",paddingBottom:"0px",textAlign:"center"}} className='SignupArrow2' > <MdOutlineArrowForward style={{background:"none",padding:"0px",position:"relative",top:"2px"}}  /> </Link> 
    </div>
  )
}

export default Middle