import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"]
    },
    deadline: {
      type: Date,
    },
    tasklist_id: {
      type: Schema.Types.ObjectId,
      ref: "tasklist"
    },
    workspace_id: {
      type: Schema.Types.ObjectId,
      ref: "workspace"
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      enum: ["Work", "Urgent", "Later"],
      default: null

    },
    is_completed: {
      type: Boolean,
      default: false
    },

  },
  {
    timestamps: true
  }
)

const Todo = mongoose.models.todo || mongoose.model('todo', todoSchema);

export default Todo;