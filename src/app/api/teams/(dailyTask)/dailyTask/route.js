import { dbConnect } from "@/helpers/db";
import DailyTask from '@/modelCS/dailyTask.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const {taskmessage, estimated_date} = body;

   
    const token = req.cookies.get("authToken:")?.value || '';
    if(!token){
        return NextResponse.json({message:"Please Login First"},{status:401})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if(!decoded){
        return NextResponse.json({message:"You are not authorized"},{status:401})
    }

    const user = decoded.user;

    const newTask = new DailyTask({
      created_by: user._id,
      taskmessage,
      estimated_date,
    });

    await newTask.save();
    return NextResponse.json({ message: 'Task created successfully', task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating task', error: error.message }, { status: 500 });
  }
}
