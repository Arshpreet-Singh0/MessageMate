import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from "ws";

dotenv.config();

import Chat from './models/chat.model';
import userRouter from './routes/user.routes';

const secretKey = process.env.SECRET_KEY || "secret_key_here";

const app = express();
const httpServer = app.listen(8080);
const wss = new WebSocket.Server({ server: httpServer });

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

const connections = new Map<String, WebSocket>();

wss.on("connection", (socket: WebSocket, request: any) => {
    const token = request.headers['authorization'];
    console.log("Token:", token);

    if (!token) {
        socket.close(4000, "Token is required");
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        console.log("Decoded:", decoded);

        const userId = decoded.userid as string;

        if(!connections.has(userId)) connections.set(userId, socket);

        socket.on("message", async (message: string) => {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === "chat") {
                const receiverId = parsedMessage.payload.receiverId;
                await Chat.create({
                    sender: userId,
                    receiver : receiverId,
                    message : parsedMessage.payload.message
                })
                
                if (connections.has(receiverId)) {
                    const receiverSocket = connections.get(receiverId);
                    receiverSocket?.send(JSON.stringify({
                        senderId: userId,
                        message: parsedMessage.payload.message
                    }));
                }
            }
        });

    } catch (error) {
        console.error("JWT Verification error:", error);
        socket.close(4001, "Invalid token");
    }
});
