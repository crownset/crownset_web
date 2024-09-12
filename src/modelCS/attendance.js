import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema({
    
  userId: { 
    type: mongoose.Types.ObjectId, 
    ref: 'userCS',
    required: true
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
},  {timestamp: true});

export const Attendance = mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);
