// src/pages/api/punch-out.js
import { OFFICE_LOCATION, calculateDistance, macAddress} from '../../../utils/location';
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

    const ip = await macAddress()

    const {latitude, longitude } = await request.json();

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
    if (distance <= 300) {
      // Find user's attendance record for the day
      const attendance = await Attendance.findOne({
        userId: token.user._id,
        punchOut: null 
      });

      if (!attendance) {
        return NextResponse.json({ message: "No punch-in record found" });
      }

      // Set punch out time
      const punchOutTime = Date.now();
      attendance.punchOut = punchOutTime;

      // Calculate work hours
      const punchInTime = new Date(attendance.punchIn);
      const workedMilliseconds = punchOutTime - punchInTime;
      const workedHours = (workedMilliseconds / (1000 * 60 * 60)).toFixed(2); // Convert to hours

      attendance.hours = workedHours

      // Save attendance record
      await attendance.save();

      return NextResponse.json({
        data: attendance,
        status: 'Punched Out',
        workedHours: `${workedHours} hours`,
        isPunchOut: true
      });
    }

    return NextResponse.json({status: 'Location out of range' });
  } catch (error) {
    return NextResponse.json({
      message: "Error in post request",
      status: 300
    });
  }
}
