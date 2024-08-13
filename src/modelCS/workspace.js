import mongoose, { Schema, SchemaType } from "mongoose";

const workspaceShema = new Schema(
    {
        name:{
            type:String,
            required:[true,"workspace name is required"]
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:'usersCS'
        },
        is_deleted:{
            type:Boolean,
            default:false
        },
        members:[{
            type:Schema.Types.ObjectId,
            ref:'userCS'
        }],

    },{
        timestamps:true
    }
);

const Workspace = mongoose.models.workspace || mongoose.model('workspace',workspaceShema);

export default Workspace;