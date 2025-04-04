import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom/client"; 
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Middle from "./components/Middle.jsx";
import { Routes,Route,Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/Authcontext.jsx";
import { HashRouter } from "react-router-dom";
import Preferences from "./components/Preferences.jsx";
import { useAuthContext } from "./context/Authcontext.jsx";
import Language from "./components/Language.jsx";
import Emotion from "./components/Emotion.jsx"
import Movie from "./components/Movie.jsx";
import { Toaster } from "react-hot-toast";
function Popup(){
    const {authUser,authpreference,authlang,authlogin}=useAuthContext();
    return (
        <div>
         <Routes>
            <Route path="/" element={ authlogin ? <Navigate to="/emotion" /> : <Home />} />
           <Route path="/signup" element={ authUser ? <Navigate to="/preferences" /> : <Signup />} />
           <Route path="/signin" element={ authlogin ? <Navigate to="/emotion" /> : <Login />} />
           <Route path="/preferences" element={ authpreference ? <Navigate to='/language' /> : <Preferences />} /> 
           <Route path="/language" element={ authlang ? <Navigate to="/middle" /> : <Language />} />
           <Route path="/middle" element={<Middle />} />
           <Route path="/emotion" element={<Emotion />} />
         </Routes>
          
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById("root"));  
   root.render(  <HashRouter>
                  <AuthContextProvider> 
                    <Popup />
             <Toaster  containerStyle={{ position: "static", zIndex: 9999, }} />
                  </AuthContextProvider>
                   </HashRouter> );