import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use("/api",userRoutes)

app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000/api")
})