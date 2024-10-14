import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({

    accessId: {
        type: Number, 
        enum: [0,1,2], 
        default: 0, 
        required: true
    },
    eid: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    firstName : {
        type: String, 
        required: true
    },
    lastName : {
        type: String, 
        required: true
    },
    dob : {
        type: String, 
        required: true
    },
    doj : {
        type: String, 
        required: true
    },
    designation: {
        type: String, 
        required: true
    },
    resettoken: {
        type: String, 
        default:""
    },
    isActive: {
        type: Boolean, 
        default: false
    },
    leaveBalance: {
        type: Number, 
        default: 0,
        min: -Infinity,
        max: 15 
    },
    department: {
        type: String, 
        enum: ["IT","Sales","Design/Social Media","HR/Admin"], 
        required: true,
    },
    companyEmail: {
        type: String, 
        default: "",
        // unique: true
    },
    bloodGroup: {
        type: String, 
        default:""
    },
    address: {
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        pincode: {
            type: String,
            default: ""
        }            
    },
    adhaarNo: {
        type: String,
        default: ""
    },
    probationTime:{
        type: String,
        default: ""
    },
    trainingTime: {
        type: String,
        default: ""
    },
    pno: {
        type: String
    },
    ip:{
        type:String
    }
})

export const UserCS = mongoose.models.userCS || mongoose.model('userCS',userSchema)