import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    provincename:{
        type:String
    },
    districtname:{
        type:String
    }
})

const districtModel = mongoose.model('District', districtSchema)
export {districtModel as District}