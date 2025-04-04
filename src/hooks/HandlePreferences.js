import { useAuthContext } from "../context/Authcontext";
import toast from "react-hot-toast"
const HandlePreferences = () => {
         const {setauthpreference}=useAuthContext();
   const Preference=async({age,gender})=>{
           try{
                 let q= localStorage.getItem("item");
                 const r=JSON.parse(q)
                 const name=r.username;
                 let res= await fetch("http://localhost:3000/api/preference",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    credentials: "include",
                    body:JSON.stringify({age,gender,name})
                 });
                 let data=await res.json();
                 if(data.error){
                    throw new Error(data.error);
                 }
                setauthpreference(data);
                toast.success("Details Added", {
                  style: {
                    background: "transparent",
                    color:"green",
                    boxShadow: "none", // Remove shadow if needed
                    marginTop: "10px", // Adjust padding as needed
                  },
                }); 
           }catch(error)
           {console.log(error)}
   }
   return {Preference}  
}

export default HandlePreferences