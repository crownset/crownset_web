import Todo from "@/modelCS/todo";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db";
import jwt from 'jsonwebtoken'

// edit todo
export async function PUT(request,{params}){
    await dbConnect();
    const {todo_id} = await params;
    try {
        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }


        const {title} = await request.json();
        
        console.log(todo_id);
        
        const todo = await Todo.findOneAndUpdate({_id:todo_id},{$set:{title:title}},{new :true})
        
        return NextResponse.json({message:"Todo updated",data:todo},{status:200});

    } catch (error) {
        console.log("Failed to update Todo",error);
        return NextResponse.json({message:"Failed to update Todo "},{status:500});
    }
}