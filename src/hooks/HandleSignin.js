import { useAuthContext } from "../context/Authcontext";
import toast from "react-hot-toast"
const HandleSignin = () => {
      const {setauthlogin}=useAuthContext();
    const signin=async({username,password})=>{
        try{                
             const res= await fetch("http://localhost:3000/api/signin",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials: "include",
                body:JSON.stringify({username,password}),
             });
             const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                chrome.storage.local.set({ authUser: data }, function () {
                    setauthlogin(data); 
                  });
                  localStorage.setItem("item", JSON.stringify(data)); 
                  toast.success("Login Succesfull", {
                    style: {
                      background: "transparent",
                      color:"green",
                      boxShadow: "none", // Remove shadow if needed
                      marginTop: "10px", // Adjust padding as needed
                    },
                  });      
              

        }
        catch(error)
        {
            toast.error(error.message, {
                          style: {
                            background: "transparent",
                            color:"red",
                            boxShadow: "none", // Remove shadow if needed
                            marginTop: "10px", // Adjust padding as needed
                          },
                        });

        }
    }
    return { signin }
}

export default HandleSignin