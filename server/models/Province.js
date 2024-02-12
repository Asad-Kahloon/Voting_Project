import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema({
    electionname:{
        type:String
    },
    provincename:{
        type:String
    }
})

const provinceModel = mongoose.model('Province', provinceSchema)
export {provinceModel as Province}