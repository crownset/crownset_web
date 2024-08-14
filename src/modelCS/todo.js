import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema( 
    {
      title:{
        type:String,
        required:[true,"Title is Required"]
      },
      deadline:{
        type:Date,
    },
    tasklist_id:{
        type:Schema.Types.ObjectId,
        ref:"tasklist"
    },
    workspace_id:{
         type:Schema.Types.ObjectId,
        ref:"workspace"
    },
    is_deleted:{
      type:Boolean,
      default:false
  },
  label:{
    type:String,
    enum:["red","yellow","green"]
    
  },

    },
    {
        timestamps:true
    }
)

const Todo = mongoose.models.todo || mongoose.model('todo',todoSchema);

export default Todo;