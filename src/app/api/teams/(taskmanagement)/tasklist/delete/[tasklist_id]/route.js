import { dbConnect } from "@/helpers/db";
import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import TaskList from "@/modelCS/tasklist";
import Workspace from "@/modelCS/workspace";
import jwt from 'jsonwebtoken'


// delete task list
export async function PUT(request, { params }) {
    dbConnect();
    try {

       
        const { tasklist_id } = params;

     
        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }
        

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        console.log("here");
        const user = decode.user;
        if (!user.accessId || user.accessId !== 1) {
            console.log("Not Authorized");
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }


        // console.log(tasklist_id,user_id);
        console.log("here");

        const list = await TaskList.findOneAndUpdate({ _id: tasklist_id }, { $set: { is_deleted: true } },{new:true});


        if (!list) {
            return NextResponse.json({ message: "Tasklist not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Tasklist Deleted successfully",data:list }, { status: 200 })
    } catch (error) {

        console.log("Failed to Delete Tasklist", error);
        return NextResponse.json({ message: "Failed to Delete Tasklist" }, { status: 200 });

    }
}