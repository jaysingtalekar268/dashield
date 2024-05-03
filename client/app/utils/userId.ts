"use client"
const getUserId = () => {
    const userIdString = localStorage.getItem("dashield")
    if (userIdString)
        return JSON.parse(userIdString);
}

const setUserId = (userData) => {
    localStorage.setItem("dashield", JSON.stringify({
        "uuidv4Id": userData.uuidv4Id,
        "_id": userData._id,
        "role": userData.role
    }));
}

const clearUserId=()=>{
    localStorage.clear();
}
export { getUserId, setUserId }