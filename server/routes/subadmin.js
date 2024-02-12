import express from "express";
import bcrypt from "bcrypt";
import { SubAdmin } from "../models/SubAdmin.js";
import { verifySuperAdmin } from "./auth.js";

const router = express.Router();

router.get("/view", async (req, res) => {
  try {
    const subadmins = await SubAdmin.find();
    return res.json(subadmins);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/viewbygender", async (req, res) => {
  try {
    const { gender } = req.query;
    const subadmins = await SubAdmin.find({ gender }); // Find subadmins where gender matches
    res.json(subadmins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbyprovince", async (req, res) => {
  try {
    const { province } = req.query;
    const subadmins = await SubAdmin.find({ province }); // Find subadmins where province matches
    res.json(subadmins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbydistrict", async (req, res) => {
  try {
    const { district } = req.query;
    const subadmins = await SubAdmin.find({ district }); // Find subadmins where province matches
    res.json(subadmins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewby", async (req, res) => {
  const { cnic } = req.query;
  try {
    // Fetch districts associated with the specified province
    const subadmin = await SubAdmin.findOne({ cnic });
    res.status(200).json(subadmin);
  } catch (error) {
    console.error("Error fetching subadmin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add", verifySuperAdmin, async (req, res) => {
  try {
    const { name, cnic, password, district, gender, province } = req.body;
    const subname = await SubAdmin.findOne({ cnic });
    if (subname) {
      res.json({ message: "Sub Admin Already Registered" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newsubadmin = new SubAdmin({
        name,
        gender,
        cnic,
        password: hashPassword,
        district,
        province,
        role: "subadmin",
      });
      await newsubadmin.save();
      return res.json({ subadmin_added: true });
    }
  } catch (error) {
    return res.json({ message: "Error Creating Sub Admin" });
  }
});

router.get("/subadmin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const subadmin = await SubAdmin.findById({ _id: id });
    return res.json(subadmin);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/subadmin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gender, cnic, password, district, province } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const subadmin = await SubAdmin.findByIdAndUpdate(
      { _id: id },
      { name, gender, cnic, password: hashPassword, district, province }
    );
    return res.json({ updated: true, subadmin });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const subadmin = await SubAdmin.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, subadmin });
  } catch (error) {
    return res.json(error);
  }
});

export { router as SubAdminRouter };
