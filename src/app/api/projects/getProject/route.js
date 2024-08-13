import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/tokenVerify";
import userCS from '@/modelCS/user'
import { dbConnect } from "@/helpers/db"
import { Project } from "@/modelCS/project";

export async function GET(request) {

  await dbConnect()

  try{

      const token = await verifyToken()

    if(token== "" || !token){
      return NextResponse.json({message: "login required"});
  }
    if(token && token.user.accessId ==1){

      const project = await Project.find({isDeleted:false}).populate("assignTo",{"firstName":1,"accessId":1},userCS).sort({"projectDate":-1})
      return NextResponse.json(project)
    }

    else {
      return NextResponse.json({message: "login with right credentials"})
    }

  }

  catch(error){
    return NextResponse.json(error)
  }

}