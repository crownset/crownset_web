import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/tokenVerify";
import {UserCS} from '@/modelCS/user'
import { dbConnect } from "@/helpers/db"
import { Leave } from "@/modelCS/leave";

export async function GET(request) {

  await dbConnect()

  try{

      const token = await verifyToken()

    if(token== "" || !token){
      return NextResponse.json({message: "login required"});
  }
    if(token && token.user.accessId ==1){

      const leave = await Leave.find({
        isDeleted: false
    }).populate("userId",{"firstName":1,"accessId":1},UserCS).populate("approvedBy",{"firstName":1,"accessId":1},UserCS).sort({"appliedDate":-1})
      return NextResponse.json(leave)
    }

    if(token && token.user.accessId ==2){

        const leave = await Leave.find({

            $and:{
            isDeleted:false,
            userId: token.user._id
          }

        }).populate("userId",{"firstName":1,"accessId":1},UserCS).populate("approvedBy",{"firstName":1,"accessId":1},UserCS).sort({"appliedDate":-1})
        return NextResponse.json(leave)
      }
    else {
      return NextResponse.json({message: "login with right credentials"})
    }

  }

  catch(error){
    console.log("errror>>>",error)
    return NextResponse.json(error)
  }

}
