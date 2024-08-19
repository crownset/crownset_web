import { dbConnect } from "@/helpers/db";
import TaskList from "@/modelCS/tasklist";
import Todo from "@/modelCS/todo";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    dbConnect();
    try {

        const { user_id } = await params;

        const taskLists = await TaskList.find({ assign_to: user_id });
        console.log(taskLists);


        const result = await Promise.all(taskLists.map(async (tasklist) => {
            const todos = await Todo.find({ tasklist_id: tasklist._id });
            return {
                ...tasklist.toObject(),
                todos
            };
        }));



        return NextResponse.json({ message: 'Tasklist Detail', data: result }, { status: 201 });

    } catch (error) {
        console.log("Error in fetching tasklist", error);
        return NextResponse.json({ message: "Error in fetching tasklist" }, { status: 500 });

    }
}