import axiosInstance from "../utils/axios"

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post("/register",{
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