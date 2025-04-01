import { useAuthContext } from "../context/Authcontext";
const HandleSign = () => {
       const {setauthUser}=useAuthContext();
     const handlesignup=async({username,password})=>{
        try{
             let res= await fetch("http://localhost:3000/api/signup",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
             });
             let data=await res.json();
             if(data.error){
                throw new Error(data.error);
             }
            localStorage.setItem("item", JSON.stringify(data)); 
              setauthUser(data);
        }
        catch(error){
          console.log(error)
        }
     }
     return {handlesignup}
}

export default HandleSign