import express, { Request, Response } from 'express';
import Chat, { FriendRequest } from '../models/chat.model';
import User from '../models/user.model';

export const getChats = async (req:Request, res:Response) => {
    try {
        const sender = req.userName;
        const receiver = req.params.receiver;
        console.log(sender, receiver);
        

        const query = {$or : [
            {sender: sender, receiver: receiver},
            {sender: receiver, receiver: sender}
        ]};

        const chats = await Chat.find(query).sort({createdAt: 1});

        res.json({
            chats,
        })

    } catch (error) {
        console.log(error);
        
    }
};

export const acceptFriendRequest = async(req:Request , res:Response)=>{
    try {
        const userName = req.userName;
        const friendName = req.params.sender;
        const user = await User.findOne({username:userName});
        if(user==null){
            res.json({
                message:"User not found",
                success : false,
            })
            return;
        }
        const isAlreadyExist = user.friends.find((f)=>(f === friendName));
        if(isAlreadyExist){
            res.json({
                message:"You are already friends",
                success : false,
                });
                return;
            }
        await FriendRequest.findOneAndDelete({
            sender: friendName,
            receiver: userName
        });
        const user1 = await User.findOne({username : userName});
        //@ts-ignore
        user1?.friends.push(friendName);
        const user2 = await User.findOne({username : friendName});
        //@ts-ignore
        user2.friends.push(userName);

        await user1?.save();
        await user2?.save();

          res.status(200).json({
            message: "Friend request accepted",
            success : true,
          });
    } catch (error) {
        console.log(error);
        
    }
}

export const getFriendRequest = async(req:Request, res:Response)=>{
    try {
        const userName = req.userName;

        const requests = await FriendRequest.find({receiver: userName});

        res.json({
            requests,
        })
    } catch (error) {
        console.log(error);
    }
}