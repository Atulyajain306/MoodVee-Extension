import User from "../models/User.js";
import bcryptjs from "bcryptjs"
const Password = async(req,res) => {
        try{
             let {username,confirmpassword}=req.body;
             let user=await User.findOne({username});
             if(!user){
                return res.status(400).json({error:"User doesn't Exist"});
             }
             const slt=await bcryptjs.genSalt(10);
             const password=await bcryptjs.hash(confirmpassword,slt);
            let newpass=await User.findOneAndUpdate({username:username},{password});
            return res.status(200).json({message:"Password Changed Successfully"});
        }
        catch(error)
        {
            console.log(error)
        }
}

export default Password