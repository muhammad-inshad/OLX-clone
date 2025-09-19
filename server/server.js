import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use("/api",userRoutes)
const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}/api`)
})