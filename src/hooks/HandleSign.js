import { useAuthContext } from "../context/Authcontext";
import toast from "react-hot-toast"
const HandleSign = () => {
       const {setauthUser}=useAuthContext();
     const handlesignup=async({username,password})=>{
        try{
             let res= await fetch("http://localhost:3000/api/signup",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                credentials: "include",
                body:JSON.stringify({username,password})
             });
             let data=await res.json();
             if(data.error){
                throw new Error(data.error);
             }
            localStorage.setItem("item", JSON.stringify(data)); 
              setauthUser(data);
              toast.success("Signup Succesfull", {
               style: {
                 background: "transparent",
                 color:"green",
                 boxShadow: "none", // Remove shadow if needed
                 marginTop: "10px", // Adjust padding as needed
               },
             });   
        }
        catch(error){
          console.log(error)
        }
     }
     return {handlesignup}
}

export default HandleSign