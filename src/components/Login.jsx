import React from 'react'
import { FaUser } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const Login = () => {
  return (
    <div className='container'>
        <div className="mood">MoodVEE</div>
         <div className='login'>Login</div>
         <div className='www'>
         <div className='cover1'>
         <FaUser className='icons'  /> 
         <input type="text" className='inp' placeholder='Username' />
         </div>
         <div className='line'></div>
         <div className='cover2' ><IoIosLock className='icons' />
         <input type="password" className='inp' placeholder='Password' />
         </div>
         <MdOutlineArrowRightAlt className='ForwardArrow' />
         </div>
         
    </div>
  )
}

export default Login