import React from 'react'
import {Link} from "react-router-dom"
import { PiConfettiBold } from "react-icons/pi";
import { BsArrowRight } from "react-icons/bs";
const Middle = () => {
  return (
    <div className='container'>
        <div className="mood">MoodVEE</div>
        <div className='register'>Sign Up <PiConfettiBold className='icons' /></div>
        <div className='register'>Successful</div>
        <div className='register'>Welcome to</div>
        <div className='register'>MoodVEE</div>
       <Link to ="/signin"> <BsArrowRight className='SignupArrow2'  /> </Link> 
    </div>
  )
}

export default Middle