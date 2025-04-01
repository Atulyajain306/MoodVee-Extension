import { useAuthContext } from "../context/Authcontext";
const Handlelanguage = () => {
    const {setauthlang}=useAuthContext();
      const newlanguage=async({language})=>{
        try{
            let q= localStorage.getItem("item");
            const r=JSON.parse(q)
            const name=r.username;
               let res= await fetch("http://localhost:3000/api/language",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({language,name})
               });
               let data = await res.json();
               if(data.error){
                throw new Error(data.error);
               }
               setauthlang(data);
          }catch(error){console.log(error)}
      }
      return {newlanguage}
}

export default Handlelanguage