import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
  },
  symbol: {
    type: String,
  },
  party: {
    type: String,
  },
  category: {
    type: String,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  province: {
    type: String,
  },
  district: {
    type: String,
  },
  constituency: {
    type: String,
  },
  votes: {
    type: Number,
  },
});

const candidateModel = mongoose.model("Candidate", candidateSchema);
export { candidateModel as Candidate };
