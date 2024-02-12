import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:String
    }
})

const electionModel = mongoose.model('Election', electionSchema)
export {electionModel as Election}