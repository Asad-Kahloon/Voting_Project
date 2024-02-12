import express from "express";
import { Province } from "../models/Province.js";
import { verifySubAdmin, verifySuperAdmin } from "./auth.js";

const router = express.Router();

router.get("/view", async (req, res) => {
  try {
    const provinces = await Province.find();
    return res.json(provinces);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/add", verifySuperAdmin, async (req, res) => {
  try {
    const { electionname, provincename } = req.body;
    const pname = await Province.findOne({ provincename });
    if (pname) {
      res.json({ message: "Province already Added" });
    } else {
      const newprovince = new Province({
        electionname,
        provincename,
      });
      await newprovince.save();
      return res.json({ province_added: true });
    }
  } catch (error) {
    return res.json({ message: "Error Adding Province" });
  }
});

router.get("/province/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const province = await Province.findById({ _id: id });
    return res.json(province);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/province/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { electionname, provincename } = req.body;
    const province = await Province.findByIdAndUpdate(
      { _id: id },
      { electionname, provincename },
      { new: true }
    );
    return res.json({ updated: true, province });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/delete/:id", verifySuperAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const province = await Province.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, province });
  } catch (error) {
    return res.json(error);
  }
});

export { router as ProvinceRouter };
