import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { MdOutlineArrowBack } from "react-icons/md";
import toast from "react-hot-toast"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HandleSign from '../hooks/HandleSign';
const Signup = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const {handlesignup}=HandleSign();
  const HandleSignup=()=>{
       if(!password || !username){
          return toast.error("Enter all Credentials", {
                        style: {
                          background: "transparent",
                          color:"red",
                          boxShadow: "none", 
                          marginTop: "10px", 
                        },
                      });
       }
      else{  
       handlesignup({username,password});
       setpassword("");
       setusername("");  }
  }
  return (
    <div className='container'>
      <div className="mood">MoodVEE</div>
      <div className='q'>
      <div className='register'>Register</div>  <BsArrowRight className='SignupArrow' onClick={HandleSignup} /></div>
      <div style={{paddingTop:"5px"}} className='www'>
      <div className='cover4'>Enter Name</div>
      <div className='line'></div>
               <div className='cover3'>
               <FaUser className='icons'  />                       
 <input type="text" className='inp' value={username} onChange={(e)=>{setusername(e.target.value)}}  placeholder='Username' />
               </div>
               <div className='line'></div>
               <div className='cover2' ><IoIosLock className='icons' />
 <input type="password" className='inp' value={password} onChange={(e)=>{setpassword(e.target.value)}}  placeholder='Password' />
               </div>
               </div>
    <Link to="/" className='Backward' style={{position:"relative",right:"90px",bottom: "5px",
    fontSize: "30px"}} >< MdOutlineArrowBack className='newlink' /></Link>    
    </div>
  )
}

export default Signup