import { Request, Response } from "express"
import User from "../models/user"

const getUserActivity = async (req: Request, resp: Response) => {
    const user_id = req.query._id;
    const result = await User.findOne({ _id: user_id }).select("activity -_id");
    console.warn("result", result);

    if (result)
        return resp.status(200).json({
            message: "activities fetched",
            success: true,
            activites: result?.activity
        });
    else
        return resp.status(404).json({
            message: "No activities",
            success: false,
        });
}

export default { getUserActivity }