
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


import { dbConnect } from "@/helpers/db"
import TaskList from "@/modelCS/tasklist";
import Workspace from "@/modelCS/workspace";

//create task list 
export async function POST(request) {
    await dbConnect()


    try {
        
        const reqBody = await request.json();

        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }


        const user = decode.user;
        if (!user.accessId || user.accessId !== 1) {
            console.log("Not Authorized");
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }
        
   

        const newTasklist = new TaskList({
            name: reqBody.name,
            workspace_id: reqBody.workspace_id,
            deadline: reqBody.deadline
        })

        const tasklist = await TaskList.create(newTasklist);
        
        
        
       
        return NextResponse.json({
            message: "Tasklist is created",
            data: tasklist
        }, { status: 201 })

    } catch (error) {
        console.log("Error in creating Tasklist");

        return NextResponse.json({
            message: "Error in creating Tasklist"
        }, { status: 500 })
    }
}
