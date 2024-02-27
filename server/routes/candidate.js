import express from "express";
import multer from "multer";
import { Candidate } from "../models/Candidate.js";
import { Voter } from "../models/Voter.js";
import { verifySuperAdmin, verifySubAdmin } from "./auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Candidates"); // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for storing the image
  },
});

const upload = multer({ storage: storage });

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

router.post(
  "/supadd",
  verifySuperAdmin,
  upload.single("symbol"),
  async (req, res) => {
    try {
      const {
        name,
        cnic,
        party,
        province,
        district,
        constituency,
        gender,
        category,
      } = req.body;
      const symbol = req.file;
      const vname = await Voter.findOne({ cnic });
      const cname = await Candidate.findOne({ cnic });
      if (!vname) {
        res.json({ message: "first add this user as a voter" });
      } else if (vname) {
        const cimage = vname.image;
        if (cname) {
          res.json({ message: "This Candidate is Already Registered" });
        } else {
          const newcandidate = new Candidate({
            name,
            symbol: symbol.filename,
            gender,
            cnic,
            district,
            province,
            image: cimage,
            party,
            constituency,
            category,
            votes: 0,
          });
          await newcandidate.save();
          return res.json({ candidate_added: true });
        }
      }
    } catch (error) {
      return res.json({ message: "Error Creating Candidate" });
    }
  }
);

router.post("/subadd", verifySubAdmin, async (req, res) => {
  try {
    const {
      name,
      cnic,
      province,
      district,
      constituency,
      gender,
      party,
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
        party,
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

router.put("/votes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const candidate = await Candidate.findByIdAndUpdate(
      { _id: id },
      { $inc: { votes: 0.5 } },
      { new: true }
    );

    return res.json({ updated: true, candidate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/updatecandidatevoteandvotervotemna/:id", async (req, res) => {
  const { id } = req.params;
  const { cnic } = req.query;

  try {
    // Find the voter by CNIC
    const voter = await Voter.findOne({ cnic });
    if (!voter) {
      return res.status(404).json({ error: "Voter not found" });
    }

    // Increment voted MNA count for the voter
    voter.votedmna++;
    await voter.save();

    // Find the candidate by ID
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Increment the vote count for the candidate
    candidate.votes++;
    await candidate.save();

    res.json({ updated: true });
  } catch (error) {
    console.error("Error updating candidate vote count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updatecandidatevoteandvotervotempa/:id", async (req, res) => {
  const { id } = req.params;
  const { cnic } = req.query;
  try {
    const vname = await Voter.findOne({ cnic });
    if (!vname) {
      res.json({ message: "error no voter found" });
    } else {
      vname.votedmpa++;
      vname.save();
    }
    // Find the candidate by ID
    const candidate = await Candidate.findById({ _id: id });
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

router.delete("/supdelete/:id", verifySuperAdmin, async (req, res) => {
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
