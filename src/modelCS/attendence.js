import mongoose, { Schema } from "mongoose";

const attendenceSchema = new Schema({
    
  userId: { 
    type: mongoose.Types.ObjectId, 
    ref: 'userCS',
    required: true
  },
  ip: { 
    type: String, 
  },
  punchIn: { 
    type: Date, 
  },
  punchOut: { 
    type: Date, 
  },
  hours: {
    type: String, 
  },
  timestamp: true
});

export const Attendence = mongoose.models.attendence || mongoose.model("attendence", attendenceSchema);
