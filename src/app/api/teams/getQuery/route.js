import { getResponse } from "@/helpers/responseMessage";
import { Query } from "@/modelCS/query";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

import { dbConnect } from "@/helpers/db"

export async function GET(request) {

  await dbConnect()

  const cookie = cookies()

  const tokenCookie= cookie.getAll()[0].value

  console.log(tokenCookie)

  try{

    if(!tokenCookie || tokenCookie == ''){
        return NextResponse.json({
            message: "Please login to access this page"
        })
    }
  

  const token = jwt.verify(tokenCookie, process.env.SECRET_KEY)
  console.log(token)


    console.log(token.user.accessId)

    
    if(token && token.user.accessId ==1){

      const query = await Query.find()
      return NextResponse.json(query)
    }

    else {
      return NextResponse.json({message: "login with right credentials"})
    }

  }

  catch(error){
    conole.log(error)
    return NextResponse.json(error)
  }

}