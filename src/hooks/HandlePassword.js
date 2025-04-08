import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
const HandlePassword = () => {
    const Navigate=useNavigate();
     const changepassword=async({username,confirmpassword})=>{
           try{
              const res= await fetch("http://localhost:3000/api/password",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,confirmpassword})
              }) 
             const data= await res.json();
             if(data.error){
                throw new Error(data.error);
             }  
             toast.success("Password Changed", {
                style: {
                  background: "transparent",
                  color:"green",
                  boxShadow: "none", // Remove shadow if needed
                  marginTop: "10px", // Adjust padding as needed
                },
              });
              Navigate("/signin");                 
           }
           catch(error)
           {
            toast.error(error.message, {
                style: {
                  background: "transparent",
                  color:"red",
                  boxShadow: "none", // Remove shadow if needed
                  marginTop: "10px", 
                },
              });
           }
     }
   return {changepassword}  
}

export default HandlePassword