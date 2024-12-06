import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from "ws";
import cors from 'cors';

dotenv.config();

import Chat, { FriendRequest } from './models/chat.model';
import userRouter from './routes/user.routes';
import chatRouter from './routes/chat.routes'
import User from './models/user.model';

const secretKey = process.env.SECRET_KEY || " ";

const app = express();
const httpServer = app.listen(8080);
const wss = new WebSocket.Server({ server: httpServer });

//cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods : ['get','post'],
}));

// Middlewares
app.use(express.json());

// Connect to DB
async function connectToDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/chatapp');
        console.log("Connected to DB");
    } catch (error) {
        console.error("DB connection error:", error);
    }
}

connectToDB();

// API routes
app.use('/api/v1', userRouter);
app.use('/api/v1', chatRouter);

const connections = new Map<String, WebSocket>();

wss.on("connection", (socket: WebSocket, request: Request) => {
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    const token = queryParams.get('token');
    // console.log("Token:", token);

    if (!token) {
        socket.close(4000, "Token is required");
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        // console.log("Decoded:", decoded);

        const userName = decoded.userName  as string;
        if (!userName) {
            throw new Error("Invalid user in token");
        }

        if(!connections.has(userName)) connections.set(userName, socket);

        socket.on("message", async (message:string) => {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === "chat") {
                const receiver = parsedMessage.payload.receiver;
                await Chat.create({
                    sender: userName,
                    receiver : receiver,
                    message : parsedMessage.payload.message
                })
                
                if (connections.has(receiver)) {
                    const receiverSocket = connections.get(receiver);
                    receiverSocket?.send(JSON.stringify({
                        sender: userName,
                        message: parsedMessage.payload.message
                    }));
                }
            }

            if(parsedMessage.type == "friend-request"){
                const receiver = parsedMessage.payload.receiver;
                if (!receiver || receiver === userName) {
                    console.error("Invalid friend request payload");
                    return;
                }

                const existingRequest = await FriendRequest.findOne({
                    sender: userName,
                    receiver: receiver,
                });

                if (existingRequest) {
                    console.log("Friend request already exists");
                    return;
                }
                await FriendRequest.create({
                    sender: userName,
                    receiver : receiver,
                });
                if(connections.has(receiver)){
                    const receiverSocket = connections.get(receiver);
                    receiverSocket?.send(JSON.stringify({
                        sender: userName,
                        type : "friend-request"
                    }));
                }

            };


        });

        socket.on("close", () => {
            console.log(`Socket closed for user: ${userName}`);
            connections.delete(userName);
        });

    } catch (error) {
        console.error("JWT Verification error:", error);
        socket.close(4001, "Invalid token");
    }
});
