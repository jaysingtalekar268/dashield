import axiosInstance from "../utils/axios"
import { getUserId, setUserId } from "../utils/userId"

type registerUserType = {
    userName: string,
    userEmail: string,
    userPwd: string,
}

type loginUserType = {
    userEmail: string,
    userPwd: string,
}


export const registerUser = async (userData: registerUserType) => {
    try {
        const response = await axiosInstance.post("/user/register", {
            ...userData
        });

        if (response.data.success) {
            console.log(response.data.success, response.data.message)
        }
        else {
            console.log("Failed to register user ", response.data.message)
        }
    } catch (error) {
        console.warn("Error while registering user", error)
    }

}

export const loginUser = async (userData: loginUserType) => {
    try {
        const response = await axiosInstance.post("/user/login", {
            ...userData
        });

        if (response.data.success) {
            setUserId({ uuidv4Id: response.data.uuidv4Id, _id: response.data._id , role:response.data.role });
            return response.data;
        }
        else {
            console.log("Failed to login user ", response.data.message)
        }
    } catch (error) {
        console.warn("Error while login user", error)
    }
}

export const logoutUser = async () => {
    try {
        const response = await axiosInstance.post("/user/logout", {
            ...getUserId()
        });

        if (response.data.success) {
            return response.data;
            
        }
        else {
            console.log("Failed to login user ", response.data.message)
        }
    } catch (error) {
        console.warn("Error while login user", error)
    }

}