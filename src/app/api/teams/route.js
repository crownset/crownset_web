import { getResponse } from "@/helpers/responseMessage";
import { UserCS } from "@/modelCS/user";
import { Query } from "@/modelCS/query";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { dbConnect } from "@/helpers/db"


export async function POST(request) {

    await dbConnect()
  const { email, password } = await request.json();

  try {
    const user = await UserCS.findOne({ email: email });

    if (user == null) {
      return NextResponse.json({ message: "user not found" });
    } else {
      const matched = bcrypt.compareSync(password, user.password);
      if (!matched) {
        return NextResponse.json({ message: "password not matched" });
      } else {
        user.isActive = true
        await user.save()

        const token = jwt.sign({user},process.env.SECRET_KEY)
        
        const response = NextResponse.json({
            data: user,
            message: "login sucessful",
            success: true
        })

        response.cookies.set("authToken:", token,{expiresIn:"1d"})

        return response
      }
    }
  } catch (error) {
    console.log(error)
    return getResponse("error found in request", 500, false);
  }
}
