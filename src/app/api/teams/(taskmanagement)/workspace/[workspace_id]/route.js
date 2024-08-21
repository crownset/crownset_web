import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


import { dbConnect } from "@/helpers/db"
import TaskList from "@/modelCS/tasklist";
import Todo from "@/modelCS/todo";


// get workspace with all list and todos
export async function GET(request, { params }) {
    await dbConnect()
    const { workspace_id } = await params
    try {

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
        
        const workspace = await Workspace.findById(workspace_id).exec();

        
        const tasklists = await TaskList.find({ workspace_id: workspace_id });

        const list = await Promise.all(
            tasklists.map(async (task) => {
                const todo = await Todo.find({ tasklist_id: task._id })
                

                const newList = {
                    ...task.toObject(),
                    todo
                }
                
                return newList;
            }));

        
        const workspaceWithTasklistsAndTodos = {
            ...workspace.toObject(),
            tasklists: list
        };


        
        return NextResponse.json({
            message: "workspace Details",
            data: workspaceWithTasklistsAndTodos
        }, { status: 201 })

    } catch (error) {
        console.log("Error in Fetching Workspace details", error);

        return NextResponse.json({
            message: "Error in Fetching Workspace details"
        }, { status: 500 })
    }
}
