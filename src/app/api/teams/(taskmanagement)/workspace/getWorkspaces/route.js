import { dbConnect } from "@/helpers/db";
import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

//get all workspaces created by user
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
        if (!user.accessId || user.accessId !== 2) {
            console.log("Not Authorized");
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        const workspace = await Workspace.find({ createdBy: user._id }).sort({createdAt:-1});


        return NextResponse.json({
            message: "All workspaces",
            data: workspace
        }, { status: 200 })

    } catch (error) {
        console.log("Error in Fetching Workspaces", error);
        return NextResponse.json({
            message: "Error in Fetching Workspaces"
        }, { status: 500 })

    }
}