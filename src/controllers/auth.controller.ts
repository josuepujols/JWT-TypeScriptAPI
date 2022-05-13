import { IUser } from './../interfaces/user.dto';
import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";


export const SingUp = async (req : Request, res : Response) => {
    //creating object
    const user: IUser = new User({
        userName: req.body.userName,
        email: req.body.email, 
        password: req.body.password
    });

    //encrypt password
    user.password = await user.encryptPassword(user.password);

    //save user
    const savedUser =  await user.save();

    //token 
    const token: string = jwt.sign({ 
        _id: savedUser._id
     }, process.env.TOKEN_SECRET || "TOKEN_TEST");

    res.header("auth-token", token).json({
        user: savedUser
    }); 
};

export const SingIn = async (req : Request, res : Response) => {
    const user = await  User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({message: "Email does not exist"});

    const isPasswordValidated: boolean = await user.validatePassword(req.body.password);
    if (isPasswordValidated) {
        const token: string = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET || "TOKEN_TEST", { expiresIn: 60 * 60 * 12 });
        return res.header("auth-token", token).json({ message: user});
    }
    return res.status(400).json({message: "Invalid password"});
};

export const Profile = async (req : Request, res : Response) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) res.status(404).json({ message: "User not found" });

    res.json({ response: user });
};