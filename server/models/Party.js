import mongoose from "mongoose";

const partySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const partyModel = mongoose.model("Party", partySchema);
export { partyModel as Party };
