import express from "express";
import {Election} from "../models/Election.js"
import {verifySuperAdmin} from "./auth.js"

const router = express.Router();


router.get('/view', async(req,res) => {
    try {
        const elections = await Election.find()
        return res.json(elections)
    } catch (error) {
        return res.json(error)
    }
})

router.post('/add',verifySuperAdmin , async (req,res) => {
    try {
        
        const {title, date} = req.body
        const electionCount = await Election.countDocuments()
        if(electionCount === 0){

          const newelection = new Election({
            title,
            date
        })
        await newelection.save()
        return res.json({election_created: true})

        }

        res.json({message:"There can only be one Election"})


    } catch (error) {
        return res.json({message: "Error Creating Election"})
    }
})

router.get("/election/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const election = await Election.findById({ _id: id });
      return res.json(election);
    } catch (error) {
      return res.json(error);
    }
  });
  
  router.put("/election/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const election = await Election.findByIdAndUpdate({ _id: id }, req.body);
      return res.json({ updated: true, election });
    } catch (error) {
      return res.json(error);
    }
  });


router.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const election = await Election.findByIdAndDelete({ _id: id });
      return res.json({ deleted: true, election });
    } catch (error) {
      return res.json(error);
    }
  });

export {router as ElectionRouter}