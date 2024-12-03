import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes'
dotenv.config();

const app = express();
import { WebSocketServer, WebSocket } from "ws";
const httpServer = app.listen(8080)
const wss = new WebSocket.Server({server:httpServer});

//middlewares
app.use(express.json());

//connect db
const connectToDB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/chatapp');
        console.log("connected to db");
        
    } catch (error) {
        console.log(error);
        
    }
};

connectToDB();

//api's
app.use('/api/v1', userRouter);

// let allSockets: User[] = [];
// const connections = new Map<String, WebSocket>();

// wss.on("connection", (socket) => {
    
    
// });