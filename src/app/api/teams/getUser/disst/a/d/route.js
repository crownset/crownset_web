
import { NextResponse } from "next/server";
import { testdbConnect } from "@/helpers/db";

export async function POST(request) {
  const {db} = await testdbConnect();

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