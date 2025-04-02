import React from 'react'
import { FaUser } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useState } from 'react';
import {Link} from "react-router-dom"
import HandleSignin from '../hooks/HandleSignin';
const Login = () => {
     const [username, setusername] = useState("");
     const [password, setpassword] = useState("");
      const {signin}=HandleSignin();
     const Handle=()=>{
         if(!username && !password){
             return ;
         }
        signin({username,password});  
           setusername("");
           setpassword(""); 
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
       <Link to="/emotion">  <MdOutlineArrowRightAlt className='ForwardArrow' onClick={Handle} /></Link>
         </div>
         
    </div>
  )
}

export default Login