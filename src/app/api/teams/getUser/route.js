import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";

export async function GET(request) {
  await dbConnect();

  try {

    const token = await verifyToken()

    if(token== "" || !token){
        return NextResponse.json({message: "login required"});
    }

    if ((token && token.user.accessId == 1) || (token && token.user.accessId == 2) ) {
      const user = await UserCS.find({}, { firstName: 1, accessId: 1, department: 1, leaveBalance: 1});
      return NextResponse.json(user);
    }
  } catch (error) {
    return NextResponse.json({
      message: "error in find user",
      status: 300,
    });
  }
}
