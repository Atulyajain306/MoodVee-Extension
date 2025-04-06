import React from 'react'
import { FaUser } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { MdOutlineArrowBack } from "react-icons/md";
import { MdOutlineArrowForward } from "react-icons/md";
import { useState } from 'react';
import { useAuthContext } from '../context/Authcontext';
import toast from "react-hot-toast"
import HandleSignin from '../hooks/HandleSignin';
import { Link } from 'react-router-dom';
const Login = () => {
     const [username, setusername] = useState("");
     const [password, setpassword] = useState("");
      const {signin}=HandleSignin();
      const {newstate}=useAuthContext();
     const Handle=()=>{
         if(!username || !password){
             return toast.error("Enter all Credentials", {
              style: {
                background: "transparent",
                color:"red",
                boxShadow: "none", // Remove shadow if needed
                marginTop: "10px", 
              },
            });
             
         }
       else{  
        signin({username,password});  
           setusername("");
           setpassword(""); 
       } 
     }
     
  return (
    <div className='container'>
        <div className="mood">MoodVEE</div>
         <div className='login'>Login</div>
         <div className='www'>
         <div className='cover1'>
         <FaUser className='icons'  /> 
         <input type="text" className='inp' value={username} onChange={(e)=>{setusername(e.target.value)}}  placeholder='Username' />
         </div>
         <div className='line'></div>
         <div className='cover2' ><IoIosLock className='icons' />
         <input type="password" className='inp' value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='Password' />
         </div>
         <MdOutlineArrowForward className='ForwardArrow' onClick={Handle} />
        <Link to={ newstate ? "/middle" :"/"} className='Backward' > <MdOutlineArrowBack className='newlink' /></Link>
         </div>
         
    </div>
  )
}

export default Login