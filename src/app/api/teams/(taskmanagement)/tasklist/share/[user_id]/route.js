import { dbConnect } from "@/helpers/db";
import { NextResponse } from "next/server";
import TaskList from "@/modelCS/tasklist";
import Workspace from "@/modelCS/workspace";
import jwt from 'jsonwebtoken';

// assign list to single user
export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 });
        }

        const { user_id } = params; // Single user_id for assignment

        let requestBody;
        try {
            requestBody = await request.json();
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
        }

        const { tasklist_id } = requestBody;
        const list = await TaskList.findOne({ _id: tasklist_id });

        if (!list) {
            return NextResponse.json({ message: "Tasklist not found" }, { status: 404 });
        }

        // Check if the user is already in the tasklist
        if (!list.assign_to.includes(user_id)) {
            // Add user to the tasklist if not already present
            await TaskList.findOneAndUpdate(
                { _id: tasklist_id },
                { $push: { assign_to: user_id } },
                { new: true }
            );
        }

        const workspace = await Workspace.findOne({ _id: list.workspace_id });

        if (!workspace) {
            // If workspace doesn't exist, remove the user from the tasklist
            await TaskList.findOneAndUpdate(
                { _id: tasklist_id },
                { $pull: { assign_to: user_id } }
            );
            return NextResponse.json({ message: "Workspace not found, user removed from tasklist" }, { status: 404 });
        }

        // Add user to workspace if not already a member
        if (!workspace.members.includes(user_id)) {
            await Workspace.findOneAndUpdate(
                { _id: list.workspace_id },
                { $push: { members: user_id } },
                { new: true }
            );
        }

        return NextResponse.json({ message: `Tasklist successfully assigned to user`, data: {} }, { status: 200 });

    } catch (error) {
        console.log("Failed to assign tasklist", error);
        return NextResponse.json({ message: "Failed to assign tasklist" }, { status: 500 });
    }
}