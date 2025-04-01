import { useAuthContext } from "../context/Authcontext";
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
                    body:JSON.stringify({age,gender,name})
                 });
                 let data=await res.json();
                 if(data.error){
                    throw new Error(data.error);
                 }
                setauthpreference(data); 
           }catch(error)
           {console.log(error)}
   }
   return {Preference}  
}

export default HandlePreferences