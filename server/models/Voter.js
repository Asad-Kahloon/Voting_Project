import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  image: {
    type: String,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  votedmna: {
    type: Boolean,
  },
  votedmpa: {
    type: Boolean,
  },
});

const voterModel = mongoose.model("Voter", voterSchema);
export { voterModel as Voter };
