import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{
        type:String
    }
})

const categoryModel = mongoose.model('Category', categorySchema)
export {categoryModel as Category}