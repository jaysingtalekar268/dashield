import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    }
});

const Admin = mongoose.model("admins", adminSchema);

export default Admin