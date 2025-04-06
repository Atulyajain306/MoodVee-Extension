import React from 'react'
import {Link} from "react-router-dom"
import { PiConfettiBold } from "react-icons/pi";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { useAuthContext } from '../context/Authcontext';
const Middle = () => {
       const {setauthlang,setnewstate}=useAuthContext();
        const Handleback=()=>{
              setauthlang(null);
              setnewstate(true);
        }
  return (
    <div className='container'>
        <div style={{marginTop:"50px"}} className="mood">MoodVEE</div>
        <div className='register'>Sign Up <PiConfettiBold className='icons' /></div>
        <div className='register'>Successful</div>
        <div className='register'>Welcome to</div>
        <div className='register'>MoodVEE</div>
        <Link to="/language" style={{position:"relative",right:"90px",bottom: "5px",
    fontSize: "30px"}} className='Backward' > <MdOutlineArrowBack className='newlink' /></Link>
   <Link to ="/signin" onClick={Handleback} style={{bottom:"65px",fontSize:"30px",alignItems:"center",paddingLeft:"15px",paddingRight:"15px",marginTop:"4px", marginRight:"20px",paddingTop:"0px",paddingBottom:"0px"}} className='SignupArrow2' > <BsArrowRight style={{background:"none",padding:"0px"}}  /> </Link> 
    </div>
  )
}

export default Middle