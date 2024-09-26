// src/pages/api/get-attendance.js
import { NextResponse } from 'next/server';
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";
import { Attendance } from '@/modelCS/attendance';

export async function PUT(request,{params}) {

  await dbConnect();

  try {
    const token = await verifyToken();

    if (token == "" || !token) {
      return NextResponse.json({ message: "Login required" });
    }

    if(token.user.accessId !==1){
        return NextResponse.json({ message: "login with correct credential" });
    }

    const {userId} = params

    const allAttendance = await Attendance.find({userId}).sort({punchIn:-1})

    const { date} = await request.json();  // Expecting the date to be provided in the request

    if(!date || date == "undefined" || date ==""){

      const attendanceRecords = []

      return NextResponse.json({
        message: "Sucess",
        status: 200,
        data: attendanceRecords,
        all: allAttendance
      });
    }

    if (date ||date !="") {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Normalize to midnight for accurate filtering

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1); // Set to the next day for range filtering

    // Query for attendance records between the start and end of the given day
      const attendanceRecords = await Attendance.find({
      userId: userId,
      punchIn: { $gte: targetDate, $lt: nextDay }
    });

    if (attendanceRecords.length === 0) {
      return NextResponse.json({ message: "No attendance records found for this date" });
    }

    return NextResponse.json({
      message: "Sucess",
      status: 200,
      data: attendanceRecords,
      all: allAttendance
    });
    }

    
  } catch (error) {
    // console.log(error)
    return NextResponse.json({
      message: "Error fetching attendance",
      status: 300
    });
  }
}
