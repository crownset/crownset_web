import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await dbConnect();
  const cookie = cookies();

  const tokenCookie = cookie.getAll()[0].value;

  try {
    if (!tokenCookie || tokenCookie == "") {
      return NextResponse.json({
        message: "Please login to access this page",
      });
    }

    const token = jwt.verify(tokenCookie, process.env.SECRET_KEY);
    // console.log(token);

    // console.log(token.user.accessId);

    if (token && token.user.accessId == 1) {
      const user = await UserCS.find({}, { firstName: 1 });
    //   console.log(user);
      return NextResponse.json(user);
    }
  } catch (error) {
    return NextResponse.json({
      message: "error in find user",
      status: 300,
    });
  }
}
