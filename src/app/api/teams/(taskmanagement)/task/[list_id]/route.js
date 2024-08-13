import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

import Task from "@/modelCS/todo";
import TaskList from "@/modelCS/tasklist";
import { dbConnect } from "@/helpers/db"



// create todo inside list
export async function POST(request,{params}) {
    await dbConnect()
   
    const {list_id} = await params;

      try {
          
        const token = request.cookies.get("authToken:")?.value || '';

        if(!token){
            return NextResponse.json({message:"Please Login First"},{status:401})
        }
        
        const decode = await jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            return NextResponse.json({message:"You are not authorized"},{status:401})
        }


        const user = decode.user;

        if(!user.accessId || user.accessId !== 2){
              console.log("Not Authorized");
              return NextResponse.json({message:"You are not authorized"},{status:401})  
        }

        const reqBody =  await request.json();
        

        const newTask = new Task({
            title:reqBody.title,
            tasklist_id:list_id,
            workspace_id:reqBody.workspace_id
            
        })
        
        const task = await Task.create(newTask);
        
        const tasklist = await TaskList.findByIdAndUpdate({_id:list_id},{
            $push:{ todo_id: list_id }
        })
        console.log(tasklist)
        return NextResponse.json({
            message:"Task is created",
            data:task
        },{status:201})

    } catch (error) {
        console.log("Error in creating Task");

        return NextResponse.json({
            message: "Error in creating Task"
        }, { status: 500 })
    }
}
