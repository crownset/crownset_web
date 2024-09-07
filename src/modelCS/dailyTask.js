const mongoose = require('mongoose');
const { Schema } = mongoose;

const dailyTaskSchema = new Schema({
    created_by: { type: Schema.Types.ObjectId, ref: 'userCS', required: true },
    taskmessage: { type: String, required: true },
    estimated_date: { type: Date, required: true },
    actual_date: { type: Date },
    task_by: { type: Schema.Types.ObjectId, ref: 'userCS' },
    share_with: [{ type: Schema.Types.ObjectId, ref: 'userCS' }],
    review: { type: Boolean, default: false },
}, { timestamps: true });

const DailyTask = mongoose.models.dailytask || mongoose.model('dailytask', dailyTaskSchema);

export default DailyTask;
