import { useAuthContext } from "../context/Authcontext";
const HandleSignin = () => {
      const {setauthlogin}=useAuthContext();
    const signin=async({username,password})=>{
        try{                
             const res= await fetch("http://localhost:3000/api/signin",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,password})
             });
             const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
               setauthlogin(data); 

        }
        catch(error)
        {
            console.log(error)

        }
    }
    return { signin }
}

export default HandleSignin