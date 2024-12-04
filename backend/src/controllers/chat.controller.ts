import express, { Request, Response } from 'express';
import Chat from '../models/chat.model';

export const getChats = async (req:Request, res:Response) => {
    try {
        const sender = req.userid;
        const receiver = req.params.receiver;
        console.log(sender, receiver);
        

        const query = {$or : [
            {sender: sender, receiver: receiver},
            {sender: receiver, receiver: sender}
        ]};

        const chats = await Chat.find(query).sort({createdAt: 1});

        res.json({
            chats
        })

    } catch (error) {
        console.log(error);
        
    }
}