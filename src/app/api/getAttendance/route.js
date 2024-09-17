// src/pages/api/get-attendance.js
import { NextResponse } from 'next/server';
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";
import { Attendance } from '@/modelCS/attendance';

export async function POST(request) {

  await dbConnect();

  try {
    const token = await verifyToken();

    if (token == "" || !token) {
      return NextResponse.json({ message: "Login required" });
    }

    const { date } = await request.json();  // Expecting the date to be provided in the request

    if (!date) {
      return NextResponse.json({ message: "Date required" });
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Normalize to midnight for accurate filtering

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1); // Set to the next day for range filtering

    // Query for attendance records between the start and end of the given day
    const attendanceRecords = await Attendance.find({
      userId: token.user._id,
      punchIn: { $gte: targetDate, $lt: nextDay }
    });

    if (attendanceRecords.length === 0) {
      return NextResponse.json({ message: "No attendance records found for this date" });
    }

    return NextResponse.json({
      status: 'Success',
      records: attendanceRecords
    });
    
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching attendance",
      status: 300
    });
  }
}
