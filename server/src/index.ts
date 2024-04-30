import express,{Request,Response} from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.get("/",(req:Request,resp:Response)=>{
    return resp.send("hello server is running bye bye");
})

app.listen(3001,()=>{
    console.log("Server is listening on port 3000");
})