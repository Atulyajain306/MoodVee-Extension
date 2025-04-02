import User from "../models/User.js";
import bcryptjs from "bcryptjs"
import protectroute from "../utils/protectroute.js";
const Signin = async(req,res) => {
      try{
           let {username,password}=req.body;
           let user=await User.findOne({username});
           if(!user){
            return res.status(400).json({error:"Username Doesn't Exist"});
        }
        let isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid Password"});
        }
            protectroute(user._id,res);
           return res.status(201),json(
            {
                username:user.username
            }
           ) 
      }catch(error)
      {console.log(error)}
}

export default Signin