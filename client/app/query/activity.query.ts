import { getUserId } from "../utils/userId"
import axiosInstance from "../utils/axios";

const getUserActivities = async () => {
    const user_id = getUserId()._id;
    const result = await axiosInstance.get("/activity/myactivities", {
        params: {
            _id: user_id
        }
    });

    if (result.data) {
        return result.data;
    }
    else {
        return {
            succeess: false
        }
    }

}

export { getUserActivities }