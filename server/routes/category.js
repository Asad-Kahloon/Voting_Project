import express from "express";
import {Category} from "../models/Category.js"
import {verifySuperAdmin} from "./auth.js"

const router = express.Router();


router.get('/view', async(req,res) => {
    try {
        const categories = await Category.find()
        return res.json(categories)
    } catch (error) {
        return res.json(error)
    }
})

router.post('/add',verifySuperAdmin , async (req,res) => {
    try {
        
        const {category} = req.body
        const cname = await Category.findOne({category})
        if(cname){
            res.json({message:"There can only be a unique Category"})
        }
        else{
          const newcategory = new Category({
            category
        })
        await newcategory.save()
        return res.json({category_created: true})
        }

    } catch (error) {
        return res.json({message: "Error Creating Election"})
    }
})

router.get("/category/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findById({ _id: id });
      return res.json(category);
    } catch (error) {
      return res.json(error);
    }
  });
  


router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findByIdAndDelete({ _id: id });
      return res.json({ deleted: true, category });
    } catch (error) {
      return res.json(error);
    }
  });

export {router as CategoryRouter}