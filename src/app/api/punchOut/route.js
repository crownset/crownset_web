// src/pages/api/punch-out.js
import { OFFICE_LOCATION, calculateDistance } from '../../../utils/location';
import { NextResponse } from 'next/server';
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";
import { Attendance } from '@/modelCS/attendance';

export async function POST(request) {

  await dbConnect()

  try {

    const token = await verifyToken()

    if (token == "" || !token) {
      return NextResponse.json({ message: "login required" });
    }

    const { ip, latitude, longitude } = await request.json();

    if (token.user.ip == "") {
      return NextResponse.json({ message: "Add your IP to your user profile" });
    }

    if (!ip || ip == "") {
      return NextResponse.json({ message: "IP not found" });
    }

    if (!latitude || latitude == "") {
      return NextResponse.json({ message: "Latitude not found" });
    }

    if (!longitude || longitude == "") {
      return NextResponse.json({ message: "Longitude not found" });
    }

    if (ip !== token.user.ip) {
      return NextResponse.json({ message: "Login with the correct device" });
    }

    // Calculate distance
    const distance = calculateDistance(
      latitude,
      longitude,
      OFFICE_LOCATION.latitude,
      OFFICE_LOCATION.longitude
    );

    // Check if within 100 meters
    if (distance <= 100) {
      // Find user's attendance record for the day
      const attendance = await Attendance.findOne({
        userId: token.user._id,
        punchOut: null 
      });

      if (!attendance) {
        return NextResponse.json({ message: "No punch-in record found" });
      }

      attendance.punchOut = Date.now();
      await attendance.save();

      return NextResponse.json({ status: 'Punched Out' });
    }
    
    return NextResponse.json({ status: 'Location out of range' });
  } catch (error) {
    return NextResponse.json({
      message: "Error in post request",
      status: 300
    });
  }
}
