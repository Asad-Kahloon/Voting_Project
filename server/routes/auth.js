import express from "express";
import dotenv from "dotenv";

dotenv.config();

import { SuperAdmin } from "../models/SuperAdmin.js";
import { SubAdmin } from "../models/SubAdmin.js";
import { Voter } from "../models/Voter.js";
import { Candidate } from "../models/Candidate.js";
import { Constituency } from "../models/Constituency.js";
import { District } from "../models/District.js";
import { Category } from "../models/Category.js";
import { Party } from "../models/Party.js";
import { Province } from "../models/Province.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { cnic, password, role } = req.body;

  if (role === "superadmin") {
    const superadmin = await SuperAdmin.findOne({ cnic });
    if (!superadmin) {
      return res.json({ login: false, message: "Super Admin not found" });
    }
    const validPassword = await bcrypt.compare(password, superadmin.password);
    if (!validPassword) {
      return res.json({ login: false, message: "wrong password" });
    }
    const token = jwt.sign(
      { cnic: superadmin.cnic, role: "superadmin" },
      process.env.Super_Admin_Key
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.json({ login: true, role: "superadmin" });
  } else if (role === "voter") {
    const voter = await Voter.findOne({ cnic });
    if (!voter) {
      return res.json({ login: false, message: "voter not found" });
    }
    const validPassword = await bcrypt.compare(password, voter.password);
    if (!validPassword) {
      return res.json({ login: false, message: "wrong password" });
    }
    const token = jwt.sign(
      { cnic: voter.cnic, role: "voter" },
      process.env.Voter_Key
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.json({ login: true, role: "voter" });
  } else if (role === "subadmin") {
    const subadmin = await SubAdmin.findOne({ cnic });
    if (!subadmin) {
      return res.json({ login: false, message: "SubAdmin not found" });
    }
    const validPassword = await bcrypt.compare(password, subadmin.password);
    if (!validPassword) {
      return res.json({ login: false, message: "Wrong password" });
    }
    // Include province and district in the token payload
    const tokenPayload = {
      cnic: subadmin.cnic,
      role: "subadmin",
      province: subadmin.province,
      district: subadmin.district,
    };

    const token = jwt.sign(tokenPayload, process.env.Sub_Admin_Key, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: true });
    return res.json({
      login: true,
      role: "subadmin",
      cnic: subadmin.cnic,
      token,
    });
  } else {
  }
});

router.get("/subcount", async (req, res) => {
  try {
    const mna = await Candidate.countDocuments({
      category: "MNA",
    });

    const mpa = await Candidate.countDocuments({
      category: "MPA",
    });

    const malecandidate = await Candidate.countDocuments({
      gender: "male",
    });

    const femalecandidate = await Candidate.countDocuments({
      gender: "female",
    });

    const candidate = await Candidate.countDocuments();

    const province = await Province.countDocuments();

    const district = await District.countDocuments();

    const party = await Party.countDocuments();

    const constituency = await Constituency.countDocuments();

    const allvoter = await Voter.countDocuments();

    const malevoter = await Voter.countDocuments({ gender: "male" });
    const femalevoter = await Voter.countDocuments({ gender: "female" });

    const category = await Category.countDocuments();

    return res.json({
      ok: true,
      mna,
      mpa,
      candidate,
      malecandidate,
      femalecandidate,
      allvoter,
      malevoter,
      femalevoter,
      district,
      province,
      party,
      constituency,
      category,
    });
  } catch (error) {
    return res.json(error);
  }
});

const verifySuperAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Super Admin" });
  } else {
    jwt.verify(token, process.env.Super_Admin_Key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifySubAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Sub Admin" });
  } else {
    jwt.verify(token, process.env.Sub_Admin_Key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyVoter = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Voter" });
  } else {
    jwt.verify(token, process.env.Voter_Key, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.Super_Admin_Key, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.Voter_Key, (err, decoded) => {
          if (err) {
            jwt.verify(token, process.env.Sub_Admin_Key, (err, decoded) => {
              if (err) {
                return res.json({ message: "Invalid Token" });
              } else {
                req.cnic = decoded.cnic;
                req.role = decoded.role;
                next();
              }
            });
          } else {
            req.cnic = decoded.cnic;
            req.role = decoded.role;
            next();
          }
        });
      } else {
        req.cnic = decoded.cnic;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

export {
  router as SuperAdminRouter,
  verifySuperAdmin,
  verifySubAdmin,
  verifyVoter,
};
