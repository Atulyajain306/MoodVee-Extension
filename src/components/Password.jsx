import React from 'react'
import { useState } from 'react';
import { FaUser } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { MdOutlineArrowBack } from "react-icons/md";
import { MdOutlineArrowForward } from "react-icons/md";
import HandlePassword from '../hooks/HandlePassword';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast"
const Password = () => {
    const [username, setusername] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const {changepassword}=HandlePassword();
      const Handle=()=>{
           if(!username || !confirmpassword){
            return toast.error("Enter all Credentials", {
                style: {
                  background: "transparent",
                  color:"red",
                  boxShadow: "none", // Remove shadow if needed
                  marginTop: "10px", 
                },
              });
           }else{
               changepassword({username,confirmpassword});
               setusername("");
               setconfirmpassword("");
               
           }
      }
  return (
    <div className='container'>
        <div className="mood">MoodVEE</div>
         <div className='login'>Change Password</div>
         <div className='www'>
         <div className='cover1'>
         <FaUser className='icons'  /> 
         <input type="text" className='inp' value={username} onChange={(e)=>{setusername(e.target.value)}}  placeholder='Username' />
         </div>
         <div className='line'></div>
         <div className='cover2' ><IoIosLock className='icons' />
         <input type="password" className='inp' value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)}} placeholder='New Password' />
         </div>
         <MdOutlineArrowForward className='ForwardArrow' onClick={Handle} />
 <Link to="/signin" className='Backward' > <MdOutlineArrowBack className='newlink' /></Link>
         </div>
         
    </div>
  )
}

export default Password