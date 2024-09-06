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

        let tasklists;
        if (user.accessId == 1) {
            tasklists = await TaskList.find({ workspace_id: workspace_id, is_deleted: false })
                .populate('assign_to', 'firstName email'); // Populate assigned users (name, email)
        } else if (user.accessId == 2) {
            tasklists = await TaskList.find({ workspace_id: workspace_id, assign_to: user._id })
                .populate('assign_to', 'firstName email'); // Populate assigned users (name, email)
        } else {
            return NextResponse.json({ message: "No Tasklist Found" }, { status: 404 });
        }

        if (!tasklists || tasklists.length === 0) {
            return NextResponse.json({ message: "No Tasklist Found" }, { status: 404 });
        }

        // Fetch todos for each tasklist
        const list = await Promise.all(
            tasklists.map(async (task) => {
                const todos = await Todo.find({ tasklist_id: task._id });

                const newList = {
                    ...task.toObject(),
                    todos,
                };

                return newList;
            })
        );

        return NextResponse.json({
            message: "Workspace Details",
            data: list,
        }, { status: 201 });
        // if (!user.accessId || user.accessId !== 1) {
        //     console.log("Not Authorized");
        //     return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        // }

        // const workspace = await Workspace.findById(workspace_id).exec();

        // if (user.accessId == 1) {
        //     const tasklists = await TaskList.find({ workspace_id: workspace_id,is_deleted:false });

        //     if (!tasklists) {
        //         return NextResponse.json({ message: "No Tasklist Found" }, { status: 404 })
        //     }
        //     const list = await Promise.all(
        //         tasklists.map(async (task) => {
        //             const todo = await Todo.find({ tasklist_id: task._id })
        //             // console.log(todo);


        //             const newList = {
        //                 ...task.toObject(),
        //                 todo
        //             }

        //             return newList;
        //         }));
        //     return NextResponse.json({
        //         message: "workspace Details",
        //         data: list
        //     }, { status: 201 })
        // }


        // if (user.accessId == 2) {
        //     const tasklists = await TaskList.find({ workspace_id: workspace_id, assign_to: user._id });

        //     if (!tasklists) {
        //         return NextResponse.json({ message: "No Tasklist Found" }, { status: 404 })
        //     }


        //     const list = await Promise.all(
        //         tasklists.map(async (task) => {
        //             const todo = await Todo.find({ tasklist_id: task._id })
        //             // console.log(todo);


        //             const newList = {
        //                 ...task.toObject(),
        //                 todo
        //             }

        //             return newList;
        //         }));
        //     return NextResponse.json({
        //         message: "workspace Details",
        //         data: list
        //     }, { status: 201 })
        // }


        // return NextResponse.json({ message: "No Tasklist Found" }, { status: 404 });
    } catch (error) {
        console.log("Error in Fetching Workspace details", error);

        return NextResponse.json({
            message: "Error in Fetching Workspace details"
        }, { status: 500 })
    }
}