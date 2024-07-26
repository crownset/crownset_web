import mongoose, { Schema } from "mongoose";

const querySchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  businessName: { type: String, required: true },
  queryContent: { type: String, required: true },
  leadBy: { type: String, required: true },
  assignTo: { type: String, required: true, default: "Garvit Chawla" },
  followUp: { type: Boolean, required: true, default: false },
  lastFollowUp: { type: Date, required: true, default: Date.now() },
  remarks: {
    type: String,
    required: true,
    enum: ["Mature", "Premature", "Dead"],
    default: "Premature"
  },
  queryDate: { type: Date, required: true, default: Date.now() },
});

export const Query = mongoose.models.queries || mongoose.model("queries", querySchema);
