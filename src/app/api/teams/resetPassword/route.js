import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { UserCS } from "@/modelCS/user";
import bcrypt from 'bcryptjs'
import { dbConnect } from "@/helpers/db"

export async function POST(request) {
    await dbConnect()
  var { password } = await request.json();

  password = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));

  const encryptedToken = await request.nextUrl.searchParams.get("token");
//   console.log("this is encrypted token:",encryptedToken)

  try {
    const token = jwt.verify(encryptedToken, process.env.SECRET_KEY);

    console.log(token.email);

    const email = await token.email
    console.log("this is email",email)
    const user = await UserCS.findOne({email})
    user.password = password

    const updateUser = await user.save()

    console.log(updateUser)

    return NextResponse.json({
      message: "password is reseted",
      status: 200,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: "link is not reseted",
      status: 500,
    });
  }
}
