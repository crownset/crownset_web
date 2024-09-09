import { dbConnect } from "@/helpers/db";
import DailyTask from '@/modelCS/dailyTask.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {


    try {
        await dbConnect();
        const { task_id } = params;

        const { share_with_id } = await req.json();
        console.log("here");

        const token = req.cookies.get("authToken:")?.value || '';
        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 });
        }

        let task = await DailyTask.findById(task_id);

        if (!task) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }


        if (!task.share_with.includes(share_with_id)) {

            task = await DailyTask.findByIdAndUpdate(
                task_id,
                { $push: { share_with: share_with_id } },
                { new: true }
            );
        }

        return NextResponse.json({ message: 'Task shared successfully', task }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error sharing task', error: error.message }, { status: 500 });
    }
}
