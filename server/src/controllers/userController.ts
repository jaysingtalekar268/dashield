import { Request, Response } from "express";
import User from "../models/user"
import { v4 as uuidv4 } from 'uuid';
import Admin from "../models/admin";

type deviceDetails = {
    userAgent: string | undefined,
    platform: string | string[] | undefined,
    origin: string | undefined,
    referer: string | undefined,
};

const createCurrentUser = async (req: Request, resp: Response) => {

    const userData = req.body;
    const existingUser = await User.findOne({ email: userData.userEmail });

    if (existingUser) {
        return resp.status(409).json({ message: "User already existed", success: false })
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



const handleNewLogin = async (email: string, deviceDetails: deviceDetails) => {
    const uuidv4Id = uuidv4();
    const result = await User.findOneAndUpdate({ email }, {
        $push: {
            activity: {
                deviceDetails,
                loggedIn: new Date().getTime(),
                uuid: uuidv4Id,
            }
        }
    });

    console.warn("result", result);
    if (result?.email == email)
        return uuidv4Id;
}

const getCurrentAdmin = async (adminEmail: string) => {
    const result = await Admin.findOne({ email: adminEmail });
    if (result)
        return result._id;
}

const getCurrentUser = async (req: Request, resp: Response) => {

    const userData = req.body;
    const regExp = new RegExp("^[a-zA-Z]*[.]+admin@dashield.org$");
    if (regExp.test(userData?.userEmail)) {
        const adminId = await getCurrentAdmin(userData.userEmail);
        if (adminId) {
            return resp.status(200).json({
                message: "Admin logged in successfully",
                success: true,
                uuidv4Id: uuidv4(),
                "_id": adminId,
                role: "admin"
            });
        }
        else {
            return resp.status(401).json({
                message: "Failed to login ",
                success: false,
            });
        }
    }



    const existingUser = await User.findOne({ email: userData.userEmail });
    if (existingUser) {
        if (existingUser.pwd === userData.userPwd) {
            const headers = req.headers;
            const deviceDetails = {
                userAgent: headers['user-agent'],
                platform: headers['sec-ch-ua-platform'],
                origin: headers.origin,
                referer: headers.referer
            };
            console.warn("headers", deviceDetails);
            const uuidv4Id = await handleNewLogin(userData.userEmail, deviceDetails);
            if (uuidv4Id)
                return resp.status(200).json({
                    message: "User login successfully",
                    success: true,
                    uuidv4Id,
                    "_id": existingUser._id,
                    role: "user"
                })
            else
                return resp.status(401).json({ message: "Failed to login", success: false })

        }
        else {
            return resp.status(401).json({ message: "User password is wrong ", success: false })
        }
    }
    else {
        return resp.status(404).json({ message: "User not found ", success: false })
    }
}


const handleLogOut = async (req: Request, resp: Response) => {
    const userData = req.body;
    if (userData?.uuidv4Id == undefined || userData?._id == undefined)
        return resp.status(401).json({ message: "Bad user Credentials ", success: false })

    const result = await User.findOneAndUpdate({ _id: userData?._id, "activity.uuid": userData?.uuidv4Id }, {
        $set: {
            "activity.$.loggedOut": new Date().getTime()
        }
    });

    console.warn("result", result, userData);
    if (result?._id == userData?._id)
        return resp.status(200).json({ message: "User logedout ", success: true })
    else
        return resp.status(401).json({ message: "User Failed to logedout ", success: false })


}





export default { createCurrentUser, getCurrentUser, handleLogOut }