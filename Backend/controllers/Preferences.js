import User from "../models/User.js";

const Preferences = async(req,res) => {
        try{
              let {gender,age,name}=req.body;  
              const user= await User.findOneAndUpdate({username:name},{age,gender});
              console.log(user);
              return res.status(201).json({"user": user}); 
        }catch(error)
        {console.log(error)}
}

export default Preferences