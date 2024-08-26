import { dbConnect } from "@/helpers/db";
import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

//delete workspace
export async function PUT(request) {
    dbConnect()
    try {
        console.count("here");
        const reqBody = await request.json();
        console.count("here")
        const token = request.cookies.get("authToken:")?.value || '';

        // console.log(reqBody);

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        const user = decode.user;
        if (user.accessId != 1) {
            return NextResponse.json({ message: "You are not authorized", }, { status: 401 });
        }

        if (user.accessId == 1) {
            const deletedWorkspace = await Workspace.findOneAndUpdate({ _id: reqBody.workspace_id }, { $set: { is_deleted: true } },{ new: true });

            if (!deletedWorkspace) {
                return NextResponse.json({
                    message: "Workspace Not Found",

                }, { status: 404 })

            }

            return NextResponse.json({
                message: "Workspace Deleted successfully",
                data: deletedWorkspace
            }, { status: 200 })

        }

        return NextResponse.json({ messgae: "No Worksapce" });

    } catch (error) {
        console.log("Error in Deleting Workspace", error);
        return NextResponse.json({
            message: "Error in Deleting Workspace"
        }, { status: 500 })

    }
}