import { getResponse } from "@/helpers/responseMessage";
import { Query } from "@/modelCS/query";
import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/tokenVerify";
import {UserCS} from '@/modelCS/user'
import { dbConnect } from "@/helpers/db"

export async function GET(request) {

  await dbConnect()

  try{

      const token = await verifyToken()

    if(token== "" || !token){
      return NextResponse.json({message: "login required"});
  }
    if(token && token.user.accessId ==1){

      const query = await Query.find({isDeleted:false}).populate("assignTo",{"firstName":1,"accessId":1},UserCS).sort({"queryDate":-1})
      console.log("this is populated 1", query)
      return NextResponse.json(query)
    }
    if(token && token.user.accessId == 2){

      const query = await Query.find(
      {$and:{

        isDeleted:false,
        assignTo: token.user._id
      }
      }).populate("assignTo","firstName",UserCS).sort({"queryDate":-1})
      return NextResponse.json(query)
    }

    else {
      return NextResponse.json({message: "login with right credentials"})
    }

  }

  catch(error){
    return NextResponse.json(error)
  }

}
