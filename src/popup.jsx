import React from "react";
import ReactDOM from "react-dom/client";
import "./components/style.css" 
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Middle from "./components/Middle.jsx";
import { Routes,Route,Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/Authcontext.jsx";
import { MemoryRouter } from "react-router-dom";
import Preferences from "./components/Preferences.jsx";
import { useAuthContext } from "./context/Authcontext.jsx";
import Language from "./components/Language.jsx";
function Popup(){
    const {authUser,authpreference,authlang}=useAuthContext();
    return (
        <div>
         <Routes>
            <Route path="/" element={<Home />} />
           <Route path="/signup" element={ authUser ? <Navigate to="/preferences" /> : <Signup />} />
           <Route path="/signin" element={ <Login />} />
           <Route path="/preferences" element={ authpreference ? <Navigate to='/language' /> : <Preferences />} /> 
           <Route path="/language" element={ authlang ? <Navigate to="/middle" /> : <Language />} />
           <Route path="/middle" element={<Middle />} />
         </Routes>
          
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));  
   root.render( <> <MemoryRouter>
                  <AuthContextProvider> 
                    <Popup />
                  </AuthContextProvider>
                   </MemoryRouter></> );