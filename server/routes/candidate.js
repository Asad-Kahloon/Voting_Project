import express from "express";
import { Candidate } from "../models/Candidate.js";
import { Voter } from "../models/Voter.js";
import { verifySuperAdmin, verifySubAdmin } from "./auth.js";

const router = express.Router();

router.get("/supview", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    return res.json(candidates);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/viewbyprovince", async (req, res) => {
  try {
    const { province } = req.query;
    const candidates = await Candidate.find({ province });
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbydistrict", async (req, res) => {
  try {
    const { district } = req.query;
    const candidates = await Candidate.find({ district });
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbyconstituency", async (req, res) => {
  try {
    const { constituency } = req.query;
    const candidates = await Candidate.find({ constituency });
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbygender", async (req, res) => {
  try {
    const { gender } = req.query;
    const candidates = await Candidate.find({ gender });
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbycategory", async (req, res) => {
  try {
    const { category } = req.query;
    const candidates = await Candidate.find({ category });
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/subview", async (req, res) => {
  const { districtname } = req.query;
  try {
    // Fetch candidates associated with the specified province
    const candidates = await Candidate.find({ district: districtname });
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/candidateconstituency", async (req, res) => {
  try {
    // Extract CNIC from the query parameters
    const constituency = req.query.constituency;

    // Find the voter based on the provided CNIC
    const candidates = await Candidate.find({ constituency });

    // If voter not found, return an error response
    if (!candidates) {
      return res.status(404).json({ error: "Voter not found" });
    }

    // If voter found, send the voter details in the response
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route to handle GET requests for MPA candidates by constituency
router.get("/mpacandidateconstituency", async (req, res) => {
  const { constituency } = req.query;
  // Filter MPA candidates based on the provided constituency
  const mpacandidates = await Candidate.find({ constituency, category: "MPA" });
  res.json(mpacandidates);
});

// Route to handle GET requests for MNA candidates by constituency
router.get("/mnacandidateconstituency", async (req, res) => {
  const { constituency } = req.query;
  // Filter MNA candidates based on the provided constituency
  const mnacandidates = await Candidate.find({ constituency, category: "MNA" });
  res.json(mnacandidates);
});

router.post("/supadd", verifySuperAdmin, async (req, res) => {
  try {
    const {
      name,
      cnic,
      province,
      district,
      constituency,
      gender,
      symbol,
      category,
    } = req.body;
    const vname = await Voter.findOne({ cnic });
    const cname = await Candidate.findOne({ cnic });
    if (!vname) {
      res.json({ message: "first add this user as a voter" });
    } else if (cname) {
      res.json({ message: "This Candidate is Already Registered" });
    } else {
      const newcandidate = new Candidate({
        name,
        symbol,
        gender,
        cnic,
        district,
        province,
        constituency,
        category,
        votes: 0,
      });
      await newcandidate.save();
      return res.json({ candidate_added: true });
    }
  } catch (error) {
    return res.json({ message: "Error Creating Candidate" });
  }
});

router.post("/subadd", verifySubAdmin, async (req, res) => {
  try {
    const {
      name,
      cnic,
      province,
      district,
      constituency,
      gender,
      symbol,
      category,
    } = req.body;
    const vname = await Voter.findOne({ cnic });
    const cname = await Candidate.findOne({ cnic });
    if (!vname) {
      res.json({ message: "first add this user as a voter" });
    } else if (cname) {
      res.json({ message: "This Candidate is Already Registered" });
    } else {
      const newcandidate = new Candidate({
        name,
        symbol,
        gender,
        cnic,
        district,
        province,
        constituency,
        category,
        votes: 0,
      });
      await newcandidate.save();
      return res.json({ candidate_added: true });
    }
  } catch (error) {
    return res.json({ message: "Error Creating Candidate" });
  }
});

router.get("/candidate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const candidate = await Candidate.findById({ _id: id });
    return res.json(candidate);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/candidate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gender, cnic, district, province, symbol, constituency } =
      req.body;
    const candidate = await Candidate.findByIdAndUpdate(
      { _id: id },
      { name, gender, cnic, province, district, constituency, symbol }
    );
    return res.json({ updated: true, candidate });
  } catch (error) {
    return res.json(error);
  }
});

router.put("/candidate/:id/vote", async (req, res) => {
  const { id } = req.params;
  try {
    // Find the candidate by ID
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Increment the vote count by 1
    candidate.votes++;
    await candidate.save();

    res.json({ updated: true });
  } catch (error) {
    console.error("Error updating candidate vote count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:id, verifySuperAdmin", async (req, res) => {
  try {
    const id = req.params.id;
    const candidate = await Candidate.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, candidate });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/subdelete/:id", verifySubAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const candidate = await Candidate.findByIdAndDelete(id);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.json({ deleted: true, candidate });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export { router as CandidateRouter };
