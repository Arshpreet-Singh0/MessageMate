import {Request, Response} from 'express';
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || " ";

interface User {
    _id : string,
    username : string,
    password? : string,
    friends? : {
        _id : string,
        username : string,
    }
}
export const signup = async(req:Request, res:Response)=>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400).json({
                message : "All fields Required.",
                success : false,
            });
            return;
        }
        
        const user = await User.findOne({username});

        if(user){
            res.status(400).json({
                message: 'Username already exists',
                success : false,
            });
            return;
        }
        const hashedPassword = await bcryptjs.hash(password, 5);

        await User.create({
            username,
            password : hashedPassword
        });

        res.status(200).json({
            message : "Account Created Successfully",
            success : true,
        });
    } catch (error) {
        console.log(error);
        
    }
}

export const login = async(req:Request, res:Response)=>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400).json({
                message : "All fields Required.",
                success : false,
            });
            return;
        }
        const user = await User.findOne({username}).populate({
            path : 'friends',
        });
        
        if(!user){
            res.status(400).json({
                message : "Invalid username",
                success : false,
            });
            return;
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);

        if(!isValidPassword){
            res.status(400).json({
                message : "Invalid username or password",
                success : false,
            });
            return;
        };

        let userInfo = {
            _id : user._id,
            username : user.username,
            friends : user.friends
        }

        const token = jwt.sign({userName : user.username}, secretKey, {expiresIn : '1d'});

        res.status(200).json({
            token,
            user : userInfo,
            message : "Login Successfull" ,
            success : true,
        });
    } catch (error) {
        console.log(error);
    };
};

export const getUsersByUserName = async(req : Request, res : Response)=>{
    try {
        const username = req.params.username;

        const user = await User.find({
            $or: [
                { username: { $regex: username, $options: "i" } },
            ]
        }).select({
            username
        });
        
        res.status(200).json({
            user
        })

    } catch (error) {
        console.log(error);
        
    }
}