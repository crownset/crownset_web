import mongoose, { Schema } from "mongoose";

const TaskListSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "List name is required"]
        },
        workspace_id:{
            type:Schema.Types.ObjectId,
            ref:'workspace'
        },
        deadline:{
            type:Date,
        },
        is_deleted:{
            type:Boolean,
            default:false
        },
        assign_to:[{
            type:Schema.Types.ObjectId,
            ref:"userCS"
        }],
        is_complete:{
            type:Boolean,
            default:false
        },
        
        
    },
    {
        timestamps: true
    }
)

const TaskList = mongoose.models.tasklist || mongoose.model('tasklist', TaskListSchema);

export default TaskList;