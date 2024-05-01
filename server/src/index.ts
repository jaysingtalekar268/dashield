import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors"
import userRoute from "./routes/userRoute"
import mongoose from "mongoose";

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL as string)
    .then(() => console.info("Mongodb connected successfully"))
    .catch((e) => console.warn("Failed to connect mongodb ", e));


app.use("/", userRoute);

app.listen(3001, () => {
    console.log("Server is listening on port 3000");
})