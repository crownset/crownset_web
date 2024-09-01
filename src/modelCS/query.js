import mongoose, { Schema } from "mongoose";

const querySchema = new Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
  businessName: { 
    type: String, 
    required: true 
  },
  queryContent: { 
    type: String, 
    required: true 
  },
  leadBy: { 
    type: String, 
    required: true, 
    // default: "website" 
  },
  service: { 
    type: String, 
    required: true
  },
  // assignTo: { type: String, required: true, default: "Garvit Chawla" },

    assignTo: { 
      type: mongoose.Types.ObjectId, 
      ref: 'userCS',
      default: "66b313d9b7a36f2644525275"
    },
  
  followUp: { 
    type: Boolean, 
    required: true, 
    default: false 
  },
  lastFollowUp: { 
    type: Date, 
    required: true, 
    default: Date.now() 
  },
  remarks: {
    type: String,
    required: true,
    enum: ["Mature", "Premature", "Dead"],
    default: "Premature"
  },
  queryDate: { 
    type: Date, 
    required: true, 
    default: Date.now() 
  },
  isDeleted: {
    type: Boolean, 
    required:true, 
    default: false
  },
  comments: {
    type: String, 
    required:true,
    default: "Comments By Website"
  }
});

export const Query = mongoose.models.queries || mongoose.model("queries", querySchema);
