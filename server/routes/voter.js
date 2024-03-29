import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import { Voter } from "../models/Voter.js";
import { verifySuperAdmin, verifySubAdmin } from "./auth.js";
import { Candidate } from "../models/Candidate.js";

// Set up multer storage and file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images"); // Destination folder for storing uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for storing the image
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/supview", async (req, res) => {
  try {
    const voters = await Voter.find();
    return res.json(voters);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/totalvoter", async (req, res) => {
  try {
    const { cnic } = req.query;
    const vname = await Voter.findOne({ cnic });
    if (vname) {
      const constituency = vname.constituency;

      const mpa = await Candidate.countDocuments({
        constituency,
        category: "MPA",
      });
      const mna = await Candidate.countDocuments({
        constituency,
        category: "MNA",
      });

      const allvoter = await Voter.countDocuments({
        constituency,
      });
      const malevoter = await Voter.countDocuments({
        gender: "male",
        constituency,
      });
      const femalevoter = await Voter.countDocuments({
        gender: "female",
        constituency,
      });
      return res.json({
        ok: true,
        allvoter,
        malevoter,
        femalevoter,
        mna,
        mpa,
        message: "voter count",
      });
    }
  } catch (error) {
    return res.json(error);
  }
});

router.get("/viewbyprovince", async (req, res) => {
  try {
    const { province } = req.query;
    const voters = await Voter.find({ province });
    res.json(voters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbydistrict", async (req, res) => {
  try {
    const { district } = req.query;
    const voters = await Voter.find({ district });
    res.json(voters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbyconstituency", async (req, res) => {
  try {
    const { constituency } = req.query;
    const voters = await Voter.find({ constituency });
    res.json(voters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/viewbygender", async (req, res) => {
  try {
    const { gender } = req.query;
    const voters = await Voter.find({ gender });
    res.json(voters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/subview", async (req, res) => {
  const { districtname } = req.query;
  try {
    // Fetch districts associated with the specified province
    const voters = await Voter.find({ district: districtname });
    res.status(200).json(voters);
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/votercnic", async (req, res) => {
  try {
    // Extract CNIC from the query parameters
    const cnic = req.query.cnic;

    // Find the voter based on the provided CNIC
    const voter = await Voter.findOne({ cnic });

    // If voter not found, return an error response
    if (!voter) {
      return res.status(404).json({ error: "Voter not found" });
    }

    // If voter found, send the voter details in the response
    res.json(voter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post(
  "/supadd",
  verifySuperAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, cnic, password, district, gender, province, constituency } =
        req.body;
      const image = req.file; // Uploaded image file
      const vname = await Voter.findOne({ cnic });
      if (vname) {
        res.json({ message: "Voter Already Registered" });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const newvoter = new Voter({
          name,
          gender,
          cnic,
          password: hashPassword,
          district,
          province,
          constituency,
          role: "voter",
          votedmna: 0,
          votedmpa: 0,
          image: image.filename, // Save the filename of the uploaded image to the database
        });
        await newvoter.save();
        return res.json({ voter_added: true });
      }
    } catch (error) {
      return res.json({ message: "Error Creating Voter" });
    }
  }
);

router.post("/subadd", verifySubAdmin, async (req, res) => {
  try {
    const { name, cnic, password, district, gender, province, constituency } =
      req.body;
    const vname = await Voter.findOne({ cnic });
    if (vname) {
      res.json({ message: "Voter Already Registered" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newvoter = new Voter({
        name,
        gender,
        cnic,
        password: hashPassword,
        district,
        province,
        constituency,
        role: "voter",
        votedmna: 0,
        votedmpa: 0,
      });
      await newvoter.save();
      return res.json({ voter_added: true });
    }
  } catch (error) {
    return res.json({ message: "Error Creating Voter" });
  }
});

router.get("/voter/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const voter = await Voter.findById({ _id: id });
    return res.json(voter);
  } catch (error) {
    return res.json(error);
  }
});

router.put("/voter/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gender, cnic, password, district, province, constituency } =
      req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const voter = await Voter.findByIdAndUpdate(
      { _id: id },
      {
        name,
        gender,
        cnic,
        password: hashPassword,
        district,
        province,
        constituency,
      }
    );
    return res.json({ updated: true, voter });
  } catch (error) {
    return res.json(error);
  }
});

router.post("/updatevotempa", async (req, res) => {
  try {
    const { cnic } = req.body;

    const voter = Voter.findOne({ cnic });
    if (!voter) {
      res.json({
        alert: "Cnic is not present in database",
      });
    } else {
      voter.votedmpa = 1;
      await voter.save();
      return res.json({ updated: true, voter });
    }
  } catch (error) {
    res.json({ alert: "Error Updating Vote" });
  }
});

router.put("/votedmna", async (req, res) => {
  try {
    const cnic = req.query.cnic;
    const voter = await Voter.findOneAndUpdate(
      { cnic },
      { $inc: { votedmna: 0.5 } },
      { new: true }
    );

    return res.json({ updated: true, voter });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/votedmpa", async (req, res) => {
  try {
    const cnic = req.query.cnic;
    const voter = await Voter.findOneAndUpdate(
      { cnic },
      { $inc: { votedmpa: 0.5 } },
      { new: true }
    );

    return res.json({ updated: true, voter });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", verifySuperAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const voter = await Voter.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, voter });
  } catch (error) {
    return res.json(error);
  }
});

router.delete("/subdelete/:id", verifySubAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const voter = await Voter.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, voter });
  } catch (error) {
    return res.json(error);
  }
});

export { router as VoterRouter };
