import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({

    accessId: {type: Number, enum: [0,1,2], default: 0, required: true},
    uid: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    dob : {type: String, required: true},
    doj : {type: String, required: true},
    designation: {type: String, required: true},
    resettoken: {type: String, default:""},
    isActive: {type: Boolean, default: false}
})

export const UserCS = mongoose.models.userCS || mongoose.model('userCS',userSchema)