import React,{ createContext, useContext } from "react";
import  {useState} from 'react'
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider=({children})=>{
const [authUser,setauthUser] = useState(null);
const [authpreference, setauthpreference] = useState(null);
const [authlang, setauthlang] = useState(null);
const [authlogin, setauthlogin] = useState(null);
const [newstate, setnewstate] = useState(false);
 return(<AuthContext.Provider value={{authUser,setauthUser,authpreference,setauthpreference,authlang,setauthlang,authlogin,setauthlogin,newstate,setnewstate}}>
            {children}
    </AuthContext.Provider>)
};
