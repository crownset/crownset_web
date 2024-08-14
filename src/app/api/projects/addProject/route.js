import { dbConnect } from "@/helpers/db";
import { getResponse } from "@/helpers/responseMessage";
import { verifyToken } from "@/helpers/tokenVerify";
import { Project } from "@/modelCS/project";
import { NextResponse } from "next/server";

export async function POST(request){

    await dbConnect()

    const{
    name,
    email,
    contactNo,
    businessName,
    projectBy,
    deadLine,
    lastFollowUp,
    remarks,
    assignTo} = await request.json()


    try{

        const token = await verifyToken()

        if(token== "" || !token){
          return NextResponse.json({message: "login required"});
      }
      if(token.user.accessId !==1){
        return NextResponse.json({message: "please login with valid credential"});
    }

        if(!name || name == ""){
            return getResponse("Name is required", 500, false)
        }
        if(!email || email == ""){
            return getResponse("Email is required", 500, false)
        }
        if(!contactNo || contactNo == ""){
            return getResponse("Contact Number is required", 500, false)
        }
        if(!businessName || businessName == ""){
            return getResponse("BusinessName is required", 500, false)
        }
        if(!assignTo || assignTo == ""){
            return getResponse("AssignTo is required", 500, false)
        }
        if(!projectBy || projectBy == ""){
            return getResponse("ProjectBy is required", 500, false)
        }
        if(!deadLine || deadLine == ""){
            return getResponse("DeadLine is required", 500, false)
        }
        if(!lastFollowUp || lastFollowUp == ""){
            return getResponse("LastFollowUp is required", 500, false)
        }
        if(!remarks || remarks == ""){
            return getResponse("Remarks is required", 500, false)
        }


        const project = new Project({
            name,
            email,
            contactNo,
            businessName,
            projectBy,
            deadLine,
            lastFollowUp,
            remarks,
            assignTo
        })
        await project.save()

    return NextResponse.json({
        data: "project saved",
        message: "post request work"
    })
}
    catch(error){

        console.log(error)

        return NextResponse.json({
            message: "error in post request",
            status: 300
        })

    }

} 