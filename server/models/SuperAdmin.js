import mongoose from "mongoose";

const superadminSchema = new mongoose.Schema({
    cnic: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const superadminModel = mongoose.model('SuperAdmin', superadminSchema)
export {superadminModel as SuperAdmin}