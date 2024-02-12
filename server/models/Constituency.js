import mongoose from "mongoose";

const constituencySchema = new mongoose.Schema({
    provincename:{
        type: String
    },
    districtname:{
        type:String
    },
    constituencyname:{
        type:String
    }
})

const constituencyModel = mongoose.model('Constituency', constituencySchema)
export {constituencyModel as Constituency}