import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import dbconnection from "./db/db.js";
import cookieParser from "cookie-parser";
import userroutes from "./routes/userroutes.js"
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api",userroutes);
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.listen(process.env.PORT,()=>{
    dbconnection();
   console.log("Server listening on 3000");
})