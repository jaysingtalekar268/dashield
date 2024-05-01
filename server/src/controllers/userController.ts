import { Request, Response } from "express";
import User from "../models/user"

const createCurrentUser = async (req: Request, resp: Response) => {

    const userData = req.body;
    const existingUser = await User.findOne({ email: userData.userEmail});

    if (existingUser) {
        return resp.status(409).json({ message: "User already existed", success: true })
    }
    else {
        const newUser = new User({
            name: userData.userName,
            email: userData.userEmail,
            pwd: userData.userPwd
        });
        await newUser.save();

        return resp.status(200).json({ message: "User created successfully", success: true })
    }
}

export default { createCurrentUser }