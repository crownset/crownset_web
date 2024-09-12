// src/pages/api/punch-in.js
import { OFFICE_LOCATION, calculateDistance } from '../../../utils/location';
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
  const {ip, latitude, longitude} = await request.json();

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

  // Calculate distance
  const distance = calculateDistance(
    latitude,
    longitude,
    OFFICE_LOCATION.latitude,
    OFFICE_LOCATION.longitude
  );

  // Check if within 100 meters
  if (distance <= 100) {

    const attendance = new Attendance({
      userId: token.user._id,
      punchIn: Date.now()
    })

    await attendance.save()
    return NextResponse.json({ status: 'Punched In' });
  } 
  return NextResponse.json({ status: 'Location out of range' });
}

catch(error){
    return NextResponse.json({
        message: "error in post request",
        status: 300});
}
}
