import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db"
import jwt from 'jsonwebtoken'
export async function PUT(request){
    await dbConnect();
    // const {workspace_id} = await params;
    try {

        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        const {updateName,workspace_id} = await request.json();
               
        const workspace = await Workspace.findOneAndUpdate({_id:workspace_id},{$set:{name:updateName}},{new :true})
        return NextResponse.json({message:"Workspace name updated",data:workspace},{status:200});

    } catch (error) {
        console.log("Failed to update Workspace name",error);
        return NextResponse.json({message:"Failed to update Workspace name "},{status:200});
    }
}