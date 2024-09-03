import { dbConnect } from "@/helpers/db";
import Tasklist from "@/modelCS/tasklist";
import UserCS from "@/modelCS/user";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function GET(request,{params}) {
    
    
    
    try {
        await dbConnect();

        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

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
