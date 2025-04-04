import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { GrCheckboxSelected } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import { useState } from 'react';
import Handlelanguage from '../hooks/Handlelanguage';
const Language = () => {
      const [language, setlanguage] = useState("");
        const {newlanguage}=Handlelanguage();
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
  return (
    <div className='container'>
             <div className="mood">MoodVEE</div>
             <div className='register'>Select Language</div>
                <div className='www'>
              <div className='cover1'>
                 <IoIosSearch className='icons'  /> 
                 <div className='cover4'>Search</div>
                            </div>
                            <div className='line'></div>
                            <div className='cover2' ><GrCheckboxSelected  className='icons' />
              <input type="text" className='inp' value={language} onChange={(e)=>{setlanguage(e.target.value)}}  placeholder='Select' />
                            </div></div>
                        <BsArrowRight className='SignupArrow2' onClick={Handlelang} />    
        </div>
    
  )
}

export default Language