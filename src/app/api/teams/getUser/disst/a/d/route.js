
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db";

export async function POST(request) {
  const {db} = await dbConnect();

  try {
      await db.dropDatabase();
      return NextResponse.json({message:"Successfully Done"});
  } catch (error) {
    console.log("error",error)
    return NextResponse.json({
      message: "error in find user",
      status: 300,
    });
  }
}