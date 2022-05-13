import { Document } from "mongoose";

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    encryptPassword(pass: string): Promise<string>;
    validatePassword(pass: string): Promise<boolean>;
};