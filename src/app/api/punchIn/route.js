// src/pages/api/punch-in.js
import { OFFICE_LOCATION, calculateDistance } from '../../../utils/location';
import { NextResponse } from 'next/server';
import { dbConnect } from "@/helpers/db";
// import { verifyToken } from "@/helpers/tokenVerify";
// import { Attendence } from '@/modelCS/attendence';

export async function POST(request) {

try{

  const { latitude, longitude, userId } = await request.json();

  // Calculate distance
  const distance = calculateDistance(
    latitude,
    longitude,
    OFFICE_LOCATION.latitude,
    OFFICE_LOCATION.longitude
  );

  // Check if within 100 meters
  if (distance <= 100) {
    console.log(`Punch-in: User ${userId} at ${latitude}, ${longitude}`);
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
