import Tasklist from "@/modelCS/tasklist";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db"

//edit task list 
export async function PUT(request,{params}){
     dbConnect();
    const {tasklist_id} = await params;
    try {
        const updatedData = await request.json();
        
        const tasklist = await Tasklist.findOneAndUpdate({_id:tasklist_id},{$set:updatedData},{new :true})
        
        return NextResponse.json({message:"Tasklist name updated",data:tasklist},{status:200});

    } catch (error) {
        console.log("Failed to update Tasklist name",error);
        return NextResponse.json({message:"Failed to update Tasklist name "},{status:500});
    }
}