import { dbConnect } from "@/helpers/db";
import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import TaskList from "@/modelCS/tasklist";
import Workspace from "@/modelCS/workspace";
import jwt from 'jsonwebtoken'


// assign list to user
export async function PUT(request, { params }) {
    await dbConnect();
    try {

        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        const { user_id } = params;

        let requestBody;
        try {
            requestBody = await request.json();
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
        }


        const { tasklist_id } = requestBody;

        // console.log(tasklist_id,user_id);

        const list = await TaskList.findOne({ _id: tasklist_id });

        // console.log(list);
        if (!list) {
            return NextResponse.json({ message: "Tasklist not found" }, { status: 404 });
        }

        // const isUserExistInList = await TaskList.findOne({},{ assign_to: user_id });
        if (list.assign_to.length > 0) {
            const isUserExistInList = list.assign_to.filter((user) => user == user_id)
            if (!isUserExistInList) {
                const tasklist = await TaskList.findOneAndUpdate({ _id: tasklist_id }, {
                    $push: { assign_to: user_id }
                }, { new: true });
            }
        } else {
            const tasklist = await TaskList.findOneAndUpdate({ _id: tasklist_id }, {
                $push: { assign_to: user_id }
            }, { new: true });
        }


        const workspace = await Workspace.findOne({ _id: list.workspace_id });

        if (!workspace) {
            return NextResponse.json({ message: "workspace not found" }, { status: 404 });

        }
        // const isUserExistInWorspace = await Workspace.findOne({ members: user_id });

        if (workspace.members.length > 0) {
            // console.log("here");
            const isUserExistInWorkspace = workspace.members.filter((user) => user == user_id)
            // console.log(isUserExistInWorkspace);
            if (isUserExistInWorkspace.length == 0) {
                // console.log("work if")
                const updateWorkspace = await Workspace.findOneAndUpdate({ _id: list.workspace_id }, {
                    $push: { members: user_id }
                }, { new: true });
            }

        }
        else {
            console.log("work else")
            const updateWorkspace = await Workspace.findOneAndUpdate({ _id: list.workspace_id }, {
                $push: { members: user_id }
            }, { new: true });
        }








        return NextResponse.json({ message: `Tasklist assigned `,data:{}}, { status: 200 });

    } catch (error) {

        console.log("Failed to Assign Tasklist", error);
        return NextResponse.json({ message: "Failed to Assign Tasklist" }, { status: 200 });

    }
}