import mongoose,{Schema} from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    assignTo: { 
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'userCS'
    },
    projectBy:{
        type: String,
        required: true
    },
    deadLine:{
        type: Date,
        required: true
    },
    lastFollowUp:{
        type: Date,
        required: true
    },
    remarks:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        required: true,
        default: false
    },
    projectDate:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const Project = mongoose.models.projects || mongoose.model("projects",projectSchema)