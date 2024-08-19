import { dbConnect } from "@/helpers/db";
import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    dbConnect();
    try {
        const { user_id } = await params;

        const workspaces = await Workspace.find({ members: user_id });


        if (!workspaces) {
            return NextResponse.json({ message: "No Assigned Workspace is Found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Assigned Workspaces", data: workspaces }, { status: 201 });

    } catch (error) {
        console.log("Error in fetching assigned Workspace");
        return NextResponse.json({
            message: "Error in fetching assigned Workspace"
        }, { status: 500 })

    }
}