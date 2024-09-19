// src/pages/api/punch-in.js
import { OFFICE_LOCATION, calculateDistance, macAddress} from '../../../utils/location';
import { NextResponse } from 'next/server';
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";
import { Attendance } from '@/modelCS/attendance';



export async function POST(request) {

  await dbConnect()

try{

  const token = await verifyToken()

  if(token== "" || !token){
    return NextResponse.json({message: "login required"});
}

  const ip = await macAddress()

  const {latitude, longitude} = await request.json();

  if(token.user.ip==""){
    return NextResponse.json({message: "Add you ip on your user"});
  }

  if(!ip||ip==""){
    return NextResponse.json({message: "Ip not found"});
  }

  if(!latitude||latitude==""){
    return NextResponse.json({message: "lattitude not found"});
  }

  if(!longitude||longitude==""){
    return NextResponse.json({message: "lattitude not found"});
  }

  if(ip!==token.user.ip){
    return NextResponse.json({message: "login with right Device"});
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to start of the day

  const alreadyPunchedIn = await Attendance.findOne({
    userId: token.user._id,
    punchIn: { $gte: today }
  });

  if (alreadyPunchedIn) {
    return NextResponse.json({ message: 'Already punched in for today'});
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

    const attendance = new Attendance({
      userId: token.user._id,
      punchIn: Date.now(),
      punchOut: null,
      isPunchIn: true
    })

    await attendance.save()
    return NextResponse.json({ data: attendance, status: 'Punched In' });
  } 
  return NextResponse.json({ status: 'Location out of range' });
}

catch(error){
  console.log(error)
    return NextResponse.json({
        message: "error in post request",
        status: 300});
}
}
