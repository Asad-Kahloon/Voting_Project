import express from "express";
import { Election } from "../models/Election.js";
import { verifySuperAdmin } from "./auth.js";
import { District } from "../models/District.js";

const router = express.Router();

router.get("/view", async (req, res) => {
  try {
    const districts = await District.find();
    return res.json(districts);
  } catch (error) {
    return res.json(error);
  }
});

// routes/districts.js

// GET route to fetch districts by province
router.get("/viewby", async (req, res) => {
  const { province } = req.query;
  try {
    // Fetch districts associated with the specified province
    const districts = await District.find({ provincename: province });
    res.status(200).json(districts);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add", verifySuperAdmin, async (req, res) => {
  try {
    const { provincename, districtname } = req.body;
    const district = await District.findOne({ districtname });
    if (district) {
      res.json({ message: "District already Added" });
    }

    const newdistrict = new District({
      provincename,
      districtname,
    });
    await newdistrict.save();
    return res.json({ district_added: true });
  } catch (error) {
    return res.json({ message: "Error Adding District" });
  }
});

router.get("/district/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const district = await District.findById({ _id: id });
    return res.json(district);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/district/:id", async (req, res) => {
  try {
    const { districtname, provincename } = req.body;
    const id = req.params.id;
    const district = await District.findByIdAndUpdate(
      { _id: id },
      { districtname, provincename }
    );
    return res.json({ updated: true, district });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const district = await District.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, district });
  } catch (error) {
    return res.json(error);
  }
});

export { router as DistrictRouter };
