import mongoose, { Schema } from "mongoose";

const leaveSchema = new Schema({
  userId: { 
    type: mongoose.Types.ObjectId, 
    ref: 'userCS',
    required: true
  },
  userName: { 
    type: String, 
    required: true 
  },
  reason: { 
    type: String, 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  appliedDate:{
    type: Date,
    required: true,
    default: Date.now()
  },
  status: {
    type: String, 
    required: true,
    enum: ["Pending", "Approved", "Reject"],
    default: "Pending"
  },

  leaveType:{
    type: String, 
    required: true,
    enum: ["Full Day", "Half Day"]
  },

  approvedBy:{
    type: mongoose.Types.ObjectId, 
    ref: 'userCS',
    required: true
  },

  isDeleted: {
    type: Boolean, 
    required:true, 
    default: false
  },

});

export const Leave = mongoose.models.leaves || mongoose.model("leaves", leaveSchema);
