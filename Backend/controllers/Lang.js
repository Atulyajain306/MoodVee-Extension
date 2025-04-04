import User from "../models/User.js";

const Lang = async(req,res) => {
     try{
            let {language,name}=req.body;
            let user=await User.findOneAndUpdate({username:name},{language});
            return res.status(201).json({"user": user});
     }catch(error){console.log(error)}
}

export default Lang