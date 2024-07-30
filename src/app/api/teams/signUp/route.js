import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getResponse } from "@/helpers/responseMessage";
import { dbConnect } from "@/helpers/db"

export async function POST(request) {

  await dbConnect()

  const {uid,email,password,firstName,lastName,dob,doj,designation} = await request.json();

  const user = new UserCS({
    uid,email,password,firstName,lastName,dob,doj,designation
  });

  try {

    if(!uid || uid == ""){
        return getResponse("UID should not be empty", 500, false)
    }

    if(!email || email==""){
        return getResponse("Email should not be empty", 500, false)
    }

    if(!password || password==""){
        return getResponse("Password should not be empty", 500, false)
    }

    if(!firstName || firstName==""){
        return getResponse("FirstName should not be empty", 500, false)
    }

    if(!lastName || lastName==""){
        return getResponse("Last Name should not be empty", 500, false)
    }

    if(!dob || dob==""){
        return getResponse("DOB should not be empty", 500, false)
    }

    if(!doj || doj==""){
        return getResponse("DOJ should not be empty", 500, false)
    }

    if(!designation || designation==""){
        return getResponse("Designation should not be empty", 500, false)
    }

    user.password = bcrypt.hashSync(
      user.password,
      10
    );
    
    let checkEmail = []
    checkEmail = await UserCS.find({email: user.email})

    console.log(checkEmail)
    
    if(!checkEmail.length == 0){
        return NextResponse.json({
            message: "please sign up with valid mail",
            success: false
        })
    }

    const createdUser = await user.save();
    const response = NextResponse.json({
      message: "data created sucess fully",
      status: 201,
      data: createdUser,
    });

    return response;
  } catch (error) {

    return NextResponse.json({
      message: "failed to create user",
      status: 600,
    });
  }
}
