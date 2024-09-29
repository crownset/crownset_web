// src/pages/api/punch-out.js
import { OFFICE_LOCATION, calculateDistance, macAddress} from '../../../utils/location';
import { NextResponse } from 'next/server';
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";
import { Attendance } from '@/modelCS/attendance';

// function normalizeMACAddress(mac) {
//   return mac.replace(/[-:]/g, '').toLowerCase();
// }

export async function POST(request) {

  await dbConnect();

  try {

    const token = await verifyToken();

    if (token == "" || !token) {
      return NextResponse.json({ message: "Login required" });
    }
    // const mac = await macAddress()

    // const ip = normalizeMACAddress(mac)

    const {latitude, longitude } = await request.json();

    // if (token.user.ip == "") {
    //   return NextResponse.json({ message: "Add your IP to your user profile" });
    // }

    // if (!ip || ip == "") {
    //   return NextResponse.json({ message: "IP not found" });
    // }

    if (!latitude || latitude == "") {
      return NextResponse.json({ message: "Latitude not found" });
    }

    if (!longitude || longitude == "") {
      return NextResponse.json({ message: "Longitude not found" });
    }

    // console.log("ip",ip)
    // console.log("tokenip",normalizeMACAddress(token.user.ip))

    // if (ip !== normalizeMACAddress(token.user.ip)) {
    //   return NextResponse.json({ message: "Login with the correct device" });
    // }

    // if(ip!==token.user.ip){
    //   return NextResponse.json({message: "login with right Device"});
    // }

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
      attendance.isPunchOut = true

      // Save attendance record
      await attendance.save();

      return NextResponse.json({
        data: attendance,
        message: 'Punched Out',
        status: 200,
        workedHours: `${workedHours} hours`,
      });
    }

    return NextResponse.json({message: 'Location out of range' });
  } catch (error) {
    return NextResponse.json({
      message: "Error in post request",
      status: 300
    });
  }
}
