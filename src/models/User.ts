import { IUser } from "interfaces/user.dto";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        Required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

//Method to encrypt the password
userSchema.methods.encryptPassword = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);;
};

//Method to validate the password
userSchema.methods.validatePassword = async function(pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.password);
};

export default model<IUser>("User", userSchema);