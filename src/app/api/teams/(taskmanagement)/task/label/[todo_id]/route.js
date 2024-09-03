import Todo from "@/modelCS/todo";
import { dbConnect } from '@/helpers/db'
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function PUT(req, { params }) {
    await dbConnect();



    try {
        // console.log("start")
        const { todo_id } = params;
        const { selectedLabel } = await req.json();

        const token = req.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }
        
        const updatedTodo = await Todo.findByIdAndUpdate(
            { _id: todo_id },
            { $set: { label: selectedLabel } },
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
