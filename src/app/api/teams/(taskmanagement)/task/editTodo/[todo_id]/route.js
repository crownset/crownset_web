import Todo from "@/modelCS/todo";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db"

// edit todo
export async function PUT(request,{params}){
     dbConnect();
    const {todo_id} = await params;
    try {

        const updatedData = await request.json();
        
        console.log(todo_id);
        
        const todo = await Todo.findOneAndUpdate({_id:todo_id},{$set:updatedData},{new :true})
        
        return NextResponse.json({message:"Todo updated",data:todo},{status:200});

    } catch (error) {
        console.log("Failed to update Todo",error);
        return NextResponse.json({message:"Failed to update Todo "},{status:500});
    }
}