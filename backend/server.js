import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors" 
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import airoutes from "./routes/airoutes.js";
import { app, server } from "./socket/socket.js";
dotenv.config();


const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cookieParser());  
app.use(cors({
	origin:"*"
}))
app.use("/api/auth", authRoutes);  
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/aiassit", airoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
