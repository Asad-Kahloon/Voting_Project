import express from "express";
import jwt from "jsonwebtoken";

import { verifySuperAdmin, verifySubAdmin } from "./auth.js";

import { Constituency } from "../models/Constituency.js";
import { Candidate } from "../models/Candidate.js";
import { Voter } from "../models/Voter.js";
import { SubAdmin } from "../models/SubAdmin.js";

const router = express.Router();

router.get("/supview", verifySuperAdmin, async (req, res) => {
  try {
    const constituencys = await Constituency.find();
    return res.json(constituencys);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/subview", verifySubAdmin, async (req, res) => {
  try {
    const { district } = req.user.district;
    const constituencys = await Constituency.find({ districtname: district });
    return res.json(constituencys);
  } catch (error) {
    return res.json(error);
  }
});

// GET route to fetch districts by province
router.get("/viewby", async (req, res) => {
  const { district } = req.query;
  try {
    // Fetch districts associated with the specified province
    const constituencies = await Constituency.find({ districtname: district });
    res.status(200).json(constituencies);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/supadd", verifySuperAdmin, async (req, res) => {
  try {
    const { provincename, districtname, constituencyname } = req.body;
    const constituency = await Constituency.findOne({ constituencyname });
    if (constituency) {
      res.json({ message: "Constituency already Added" });
    }

    const newconstituency = new Constituency({
      provincename,
      districtname,
      constituencyname,
    });
    await newconstituency.save();
    return res.json({ constituency_added: true });
  } catch (error) {
    return res.json({ message: "Error Adding Constituency" });
  }
});

router.post("/subadd", verifySubAdmin, async (req, res) => {
  try {
    const { constituencyname, provincename, districtname } = req.body;
    const constituency = await Constituency.findOne({ constituencyname });

    if (constituency) {
      res.json({ message: "Constituency already Added" });
    } else {
      const newconstituency = new Constituency({
        provincename,
        districtname,
        constituencyname,
      });
      await newconstituency.save();
      return res.json({ constituency_added: true });
    }
  } catch (error) {
    return res.json({ message: "Error Adding Constituency" });
  }
});

router.get("/constituency/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const constituency = await Constituency.findById({ _id: id });
    return res.json(constituency);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/form45/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const constituency = await Constituency.findById({ _id: id });
    const currentconstituency = constituency.constituencyname;

    const mpacandidates = await Candidate.find({
      constituency: currentconstituency,
      category: "MPA",
    });

    const mnacandidates = await Candidate.find({
      constituency: currentconstituency,
      category: "MNA",
    });

    const totalvoters = await Voter.countDocuments({
      constituency: currentconstituency,
    });

    const malevoters = await Voter.countDocuments({
      constituency: currentconstituency,
      gender: "male",
    });

    const femalevoters = await Voter.countDocuments({
      constituency: currentconstituency,
      gender: "female",
    });

    const malevotedmpa = await Voter.countDocuments({
      constituency: currentconstituency,
      votedmpa: true,
      gender: "male",
    });

    const femalevotedmpa = await Voter.countDocuments({
      constituency: currentconstituency,
      votedmpa: true,
      gender: "female",
    });

    const malevotedmna = await Voter.countDocuments({
      constituency: currentconstituency,
      votedmna: true,
      gender: "male",
    });

    const femalevotedmna = await Voter.countDocuments({
      constituency: currentconstituency,
      votedmna: true,
      gender: "female",
    });

    const votedmna = await Voter.countDocuments({
      constituency: currentconstituency,
      votedmna: true,
    });

    const votedmpa = await Voter.countDocuments({
      constituency: currentconstituency,
      votedmpa: true,
    });

    return res.json({
      currentconstituency,
      mpacandidates,
      mnacandidates,
      totalvoters,
      malevoters,
      femalevoters,
      votedmna,
      malevotedmna,
      femalevotedmna,
      votedmpa,
      malevotedmpa,
      femalevotedmpa,
    });
  } catch (error) {
    return res.json(error);
  }
});

router.put("/supconstituency/:id", verifySuperAdmin, async (req, res) => {
  try {
    const { districtname, provincename, constituencyname } = req.body;
    const id = req.params.id;
    const constituency = await Constituency.findByIdAndUpdate(
      { _id: id },
      { districtname, provincename, constituencyname }
    );
    return res.json({ updated: true, constituency });
  } catch (error) {
    return res.json(error);
  }
});

router.put("/subconstituency/:id", verifySubAdmin, async (req, res) => {
  try {
    const { districtname, provincename, constituencyname } = req.body;
    const id = req.params.id;
    const constituency = await Constituency.findByIdAndUpdate(
      { _id: id },
      { districtname, provincename, constituencyname }
    );
    return res.json({ updated: true, constituency });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/supdelete/:id", verifySuperAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const constituency = await Constituency.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, constituency });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/subdelete/:id", verifySubAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const constituency = await Constituency.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, constituency });
  } catch (error) {
    return res.json(error);
  }
});

export { router as ConstituencyRouter };
