import { dbConnect } from "@/helpers/db";
import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

//get all workspaces created by user and assigned to user
export async function GET(request) {
    dbConnect()
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
        console.log(user);
        if (user.accessId == 1) {
            const workspace = await Workspace.find({is_deleted:false}).sort({ createdAt: -1 });

            return NextResponse.json({
                message: "All workspaces",
                data: workspace
            }, { status: 200 })

        }

        if (user.accessId == 2) {
            const workspaces = await Workspace.find({ members: user._id });
            if (!workspaces) {
                return NextResponse.json({ message: "No Assigned Workspace is Found" }, { status: 404 });
            }

            return NextResponse.json({ message: "Assigned Workspaces", data: workspaces }, { status: 201 });

        }

        return NextResponse.json({messgae:"No Worksapce"});

    } catch (error) {
        console.log("Error in Fetching Workspaces", error);
        return NextResponse.json({
            message: "Error in Fetching Workspaces"
        }, { status: 500 })

    }
}