

import { dbConnect } from '@/helpers/db';
import Todo from '@/modelCS/todo'
import TaskList from '@/modelCS/tasklist';
import {  NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'



export async function PUT(req) {
    await dbConnect();

    try {


        const {todo_id} = await req.json();
        // console.log("todo_id",todo_id);
        const token = req.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        
        const todo = await Todo.findById({ _id: todo_id });
        if (!todo) {
            return NextResponse.json({ message: "Todo not found" }, { status: 404 })
        }
        
        if(todo.mark_for_review){
            return NextResponse.json({message:"Already Requested For Review"},{status:200})
        }
        

        const newtodo = await Todo.findByIdAndUpdate({ _id: todo_id }, { $set: { mark_for_review: true } }, { new: true });

        return NextResponse.json({ message: "Todo Updated", data: todo }, { status: 200 })

    } catch (error) {
        console.error('Error updating todo and task list:', error);
        return NextResponse.json({ message: "Error updating todo and task list" }, { status: 500 })

    }

}


