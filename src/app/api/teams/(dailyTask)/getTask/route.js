import { dbConnect } from "@/helpers/db";
import { NextResponse } from "next/server";
import DailyTask from "@/modelCS/dailyTask";
import jwt  from "jsonwebtoken";

export async function GET(req) {
    try {
        await dbConnect();
        const token = req.cookies.get("authToken:")?.value || '';
        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 });
        }

        const created_by = decoded.user._id

        const tasks = await DailyTask.find({ created_by }).populate({path:"share_with", select:"firstName"}).sort({ createdAt: -1 })

        if (tasks.length === 0) {
            return NextResponse.json({ message: "No Task Found", tasks: [] }, { status: 400 })
        }

        return NextResponse.json({ message: "Tasks fetched successfully", tasks }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error fetching tasks', error: error.message }, { status: 500 });
    }
}
