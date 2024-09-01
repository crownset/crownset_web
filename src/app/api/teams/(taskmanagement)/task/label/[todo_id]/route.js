import Todo from "@/modelCS/todo";
import { dbConnect } from '@/helpers/db'
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    await dbConnect();

    const { todo_id } = params;
    const { selectedLabel } = await req.json();


    try {


        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: todo_id },
            { label: selectedLabel },
            { new: true }
        );

        if (!updatedTodo) {
            return NextResponse.json({ success: false, message: "Todo not found" })

        }

        return NextResponse.json({ success: true, data: updatedTodo })


    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to update Label" });
    }

}
