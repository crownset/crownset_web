import { dbConnect } from "@/helpers/db";
import { NextResponse } from "next/server";
import DailyTask from "@/modelCS/dailyTask";
import jwt from 'jsonwebtoken'

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { user_id } = params;
        
       console.log(user_id);
        const token = req.cookies.get("authToken:")?.value || '';
        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 });
        }

        const share_with_id = decoded.user._id
        // console.log(share_with);
        const tasks = await DailyTask.find({ created_by:user_id,share_with:share_with_id }).sort({ createdAt: -1 })
        // console.log(tasks);

        if (tasks.length === 0) {
            return NextResponse.json({ message: "No Task Found", tasks: [] }, { status: 400 })
        }

        return NextResponse.json({ message: "Tasks fetched successfully",tasks}, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error fetching tasks', error: error.message }, { status: 500 });
    }
}
