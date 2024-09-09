import { dbConnect } from "@/helpers/db";
import DailyTask from '@/modelCS/dailyTask.js';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();

  const { task_id } = params;

  try {
    const UpdatedData= await req.json();
   

    const token = req.cookies.get("authToken:")?.value || '';
    if(!token){
        return NextResponse.json({message:"Please Login First"},{status:401})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    if(!decoded){
        return NextResponse.json({message:"You are not authorized"},{status:401})
    }

  //  console.log(task_id);
    const updatedTask = await DailyTask.findByIdAndUpdate(
      {_id:task_id},
      UpdatedData,
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task updated successfully', task: updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating task', error: error.message }, { status: 500 });
  }
}
