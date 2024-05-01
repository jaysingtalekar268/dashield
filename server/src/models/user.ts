import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true
    },
    pwd: {
        type: String,
        require: true
    }
})

const User = mongoose.model("user", userSchema);

export default User;