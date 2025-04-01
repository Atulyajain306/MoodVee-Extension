import express from "express";
import Signup from "../controllers/Signup.js";
import Preferences from "../controllers/Preferences.js";
import Lang from "../controllers/Lang.js";
const router=express.Router();

router.post("/signup",Signup);
router.post("/preference",Preferences);
router.post("/language",Lang)
export default router