import User from "../models/User.js"
import bcryptjs from "bcryptjs"
const Signup = async(req,res) => {
       try{
        let {username,password}=req.body
        console.log(username,password)
        const user= await User.findOne({username});
        if(user){
            return res.status(400).json({"error":"Username Already Exists"}); 
        };
        const slt=await bcryptjs.genSalt(10);
        const hashpassword=await bcryptjs.hash(password,slt);
        const newUser= new User({
             username,
             password:hashpassword,
        });
        await newUser.save();
          res.status(200).json({"username":newUser.username});
        
    }
       catch(error)
       {console.log(error)}
}

export default Signup