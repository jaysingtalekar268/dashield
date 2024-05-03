import mongoose from "mongoose";


const activitySchema = new mongoose.Schema({
    deviceDetails: {
        userAgent: { type: String },
        platform: { type: String },
        origin: { type: String },
        referer: { type: String },
    },
    uuid: {
        type: String,
        required: true
    },
    loggedIn: {
        type: Number,
        required: true
    },
    loggedOut: {
        type: Number,
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    activity: [activitySchema]
})

const User = mongoose.model("users", userSchema);

export default User;