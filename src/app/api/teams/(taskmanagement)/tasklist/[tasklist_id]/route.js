import Tasklist from "@/modelCS/tasklist";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db"
import jwt from 'jsonwebtoken'

//edit task list 
export async function PUT(request,{params}){
     dbConnect();
    const {tasklist_id} = await params;
    try {
        const token = request.cookies.get("authToken:")?.value || '';

        if (!token) {
            return NextResponse.json({ message: "Please Login First" }, { status: 401 })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return NextResponse.json({ message: "You are not authorized" }, { status: 401 })
        }

        const updatedData = await request.json();
        
        const tasklist = await Tasklist.findOneAndUpdate({_id:tasklist_id},{$set:updatedData},{new :true})
        
        return NextResponse.json({message:"Tasklist name updated",data:tasklist},{status:200});

    } catch (error) {
        console.log("Failed to update Tasklist name",error);
        return NextResponse.json({message:"Failed to update Tasklist name "},{status:500});
    }
}