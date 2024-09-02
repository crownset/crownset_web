import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db"
export async function PUT(request){
     dbConnect();
    // const {workspace_id} = await params;
    try {
        const {updateName,workspace_id} = await request.json();
               
        const workspace = await Workspace.findOneAndUpdate({_id:workspace_id},{$set:{name:updateName}},{new :true})
        return NextResponse.json({message:"Workspace name updated",data:workspace},{status:200});

    } catch (error) {
        console.log("Failed to update Workspace name",error);
        return NextResponse.json({message:"Failed to update Workspace name "},{status:200});
    }
}