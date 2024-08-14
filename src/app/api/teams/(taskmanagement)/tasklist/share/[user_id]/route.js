import { dbConnect } from "@/helpers/db";
import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import TaskList from "@/modelCS/tasklist";


// assign list to user
export async function PUT(request, { params }) {
    dbConnect();
    try {
        const { user_id } = params;

        const { tasklist_id } = await request.json();

        const list = await TaskList.findOne({ _id: tasklist_id });
        const userExist = list?.assign_to.map((id, indx) => id == user_id);

        if (userExist) {
            return NextResponse.json({ message: "User already present" }, { status: 400 });
        }

        const tasklist = await TaskList.findOneAndUpdate({ _id: tasklist_id }, {
            $push: { assign_to: user_id }
        }, { new: true })

        return NextResponse.json({ message: `Tasklist assigned `, data: list }, { status: 200 });

    } catch (error) {

        console.log("Failed to Assign Tasklist", error);
        return NextResponse.json({ message: "Failed to Assign Tasklist" }, { status: 200 });

    }
}