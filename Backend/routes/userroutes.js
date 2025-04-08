import express from "express";
import Signup from "../controllers/Signup.js";
import Preferences from "../controllers/Preferences.js";
import Lang from "../controllers/Lang.js";
import Signin from "../controllers/Signin.js";
import Password from "../controllers/Password.js";
const router=express.Router();

router.post("/signup",Signup);
router.post("/preference",Preferences);
router.post("/language",Lang);
router.post("/signin",Signin);
router.post("/password",Password)
export default router