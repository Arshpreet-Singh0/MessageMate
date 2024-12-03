import {Request, Response} from 'express';
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || " ";

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
        console.log(username, password);
        
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
        const user = await User.findOne({username});
        
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
        }

        const token = jwt.sign({userid : user._id}, secretKey, {expiresIn : '1d'});

        res.status(200).json({
            token,
        });
    } catch (error) {
        console.log(error);
    }
}