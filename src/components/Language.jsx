import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast"
import { useAuthContext } from '../context/Authcontext';
import Handlelanguage from '../hooks/Handlelanguage';
const Language = () => {
      const [language, setlanguage] = useState("");
        const {newlanguage}=Handlelanguage();
        const {setauthpreference}=useAuthContext();
      const Handlelang=()=>{
           if(!language){
            return toast.error("Enter Credentials", {
                          style: {
                            background: "transparent",
                            color:"red",
                            boxShadow: "none", // Remove shadow if needed
                            marginTop: "10px", 
                          },
                        });
           } else{
            newlanguage({language});
            setlanguage(""); }
      }
     const Handleback=()=>{
            setauthpreference(null);
     }

  return (
    <div className='container'>
             <div style={{marginTop:"50px"}} className="mood">MoodVEE</div>
             <div className='register'>Select Language</div>
                <div className='www'>
              <div className='cover5'>
                 <IoIosSearch className='icons'  /> 
                 <div className='cover6'>Search</div>
                            </div>
                            <div className='line'></div>
                  <div className='cover2' ><MdOutlineCheckBoxOutlineBlank  className='icons' />
              <input type="text" className='inp' value={language} onChange={(e)=>{setlanguage(e.target.value)}}  placeholder='Select' />
                            </div></div>
       <Link to="/preferences" onClick={Handleback} style={{position:"relative",right:"90px",bottom: "5px",
    fontSize: "30px"}} className='Backward' > <MdOutlineArrowBack className='newlink' /></Link> 
           <div style={{bottom:"74px",alignItems:"center",paddingLeft:"15px",paddingRight:"15px",paddingTop:"5px",paddingBottom:"5px"}} className='SignupArrow2'  onClick={Handlelang} >  <BsArrowRight  style={{background:"none",padding:"0px"}}  /> </div>                       
        </div>
    
  )
}

export default Language