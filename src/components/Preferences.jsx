import React from 'react'
import { useState } from 'react'
import toast from "react-hot-toast"
import { MdOutlineElderly } from "react-icons/md";
import { ImManWoman } from "react-icons/im";
import { MdOutlineArrowBack } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { Link } from 'react-router-dom';
import HandlePreferences from '../hooks/HandlePreferences';
const Preferences = () => {
    const [age, setage] = useState("");
    const [gender, setgender] = useState("")
     const {Preference}=HandlePreferences();
    const HandlePref=()=>{
        if(!age || !gender ){
            return toast.error("Enter all Credentials", {
              style: {
                background: "transparent",
                color:"red",
                boxShadow: "none", // Remove shadow if needed
                marginTop: "10px", 
              },
            }); 
        } else{
        Preference({age,gender});
        setage("");
        setgender(""); }
    }
    
  return (
    <div  className='container'>
         <div className="mood">MoodVEE</div>
         <div className='register'>Preferences</div>
            <div className='www'>
          <div className='cover1'>
             <MdOutlineElderly className='icons'  /> 
 <input type="number" className='inp' value={age} onChange={(e)=>{setage(e.target.value)}}  placeholder='Enter Age' />
                        </div>
                        <div className='line'></div>
                        <div className='cover2' ><ImManWoman  className='icons' />          
      <select className='inp' value={gender} onChange={(e)=>{setgender(e.target.value)}}>
           <option className='inp' value="" >Enter Gender</option>
           <option className='inp' value="Male" >Male</option>
           <option className='inp'   value="Female">Female</option>
           <option className='inp' value="Other">Other</option>
      </select>
    </div></div>
    <Link to="/signup" style={{position:"relative",right:"90px",bottom: "5px",
    fontSize: "30px"}}  className='Backward' > <MdOutlineArrowBack className='newlink' /></Link>
   <div style={{bottom:"75px",alignItems:"center",paddingLeft:"15px",paddingRight:"15px",paddingTop:"0px",paddingBottom:"0px"}} className='SignupArrow2'  onClick={HandlePref} >  <BsArrowRight  style={{background:"none",padding:"0px"}}  /> </div>   
    </div>

  )
}

export default Preferences