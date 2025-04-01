import React from 'react'
import { useState } from 'react'
import { MdOutlineElderly } from "react-icons/md";
import { ImManWoman } from "react-icons/im";
import { BsArrowRight } from "react-icons/bs";
import HandlePreferences from '../hooks/HandlePreferences';
const Preferences = () => {
    const [age, setage] = useState("");
    const [gender, setgender] = useState("")
     const {Preference}=HandlePreferences();
    const HandlePref=()=>{
        if(!age && !gender ){
            return 
        }
        Preference({age,gender});
        setage("");
        setgender("");
    }
  return (
    <div className='container'>
         <div className="mood">MoodVEE</div>
         <div className='register'>Preferences</div>
            <div className='www'>
          <div className='cover1'>
             <MdOutlineElderly className='icons'  /> 
 <input type="number" className='inp' value={age} onChange={(e)=>{setage(e.target.value)}}  placeholder='Enter Age' />
                        </div>
                        <div className='line'></div>
                        <div className='cover2' ><ImManWoman  className='icons' />
          <input type="text" className='inp' value={gender} onChange={(e)=>{setgender(e.target.value)}}  placeholder='Enter Gender' />
                        </div></div>
                    <BsArrowRight className='SignupArrow2' onClick={HandlePref} />    
    </div>

  )
}

export default Preferences