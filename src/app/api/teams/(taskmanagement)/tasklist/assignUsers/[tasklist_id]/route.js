import { dbConnect } from "@/helpers/db";
import Tasklist from "@/modelCS/tasklist";
import UserCS from "@/modelCS/user";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    
    
    
    try {
        await dbConnect();
        const {tasklist_id} = params
         
        const tasklist = await Tasklist.findById({ _id: tasklist_id }).populate('assign_to');
        console.count("here");
        
        if (!tasklist) {
            return NextResponse.json({ success: false, message: "Tasklist not found" });
        }

        return NextResponse.json({ success: true, data: tasklist.assign_to })

    } catch (error) {
        return NextResponse.json({ success: false, message: "Not Fetch Assigned user" ,error})

    }

}
