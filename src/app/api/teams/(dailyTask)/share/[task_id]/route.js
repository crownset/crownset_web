import { dbConnect } from "@/helpers/db";
import DailyTask from '@/modelCS/dailyTask.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    await dbConnect();

    const { task_id } = params;

    try {
        console.count("here");
        const { user_id } = await req.json();

        console.count("Here");
        const token = req.cookies.get("authToken:")?.value || '';
        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }


        let task = await DailyTask.findById({ _id: task_id });
        console.count("Here");
        if (!task) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        // Add users to share_with array, avoiding duplicates

        console.count("Here");
       
        if (!task.share_with.includes(user_id)) {
            task = await DailyTask.findOneAndUpdate(
                { _id: task_id },
                { $push: { share_with: user_id } },
                { new: true }
            );
        }
        console.count("Here");
        

        return NextResponse.json({ message: 'Task shared successfully', task }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error sharing task', error: error.message }, { status: 500 });
    }
}
