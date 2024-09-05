import { dbConnect } from "@/helpers/db";
import { getResponse } from "@/helpers/responseMessage";
import { verifyToken } from "@/helpers/tokenVerify";
import { Leave } from "@/modelCS/leave";
import { NextResponse } from "next/server";

export async function POST(request){

    await dbConnect()

    const{
        userId,
        userName,
        reason,
        startDate,
        endDate,
        approvedBy,
        leaveType
    }
         = await request.json()


    try{

        const token = await verifyToken()

        if(token== "" || !token){
          return NextResponse.json({message: "login required"});
      }

      if(token.user.accessId !==2){
        return NextResponse.json({message: "please login with valid credential"});
    }
        if(!userId || userId == ""){
            return getResponse("User ID is required", 500, false)
        }
        if(!userName || userName == ""){
            return getResponse("User Name is required", 500, false)
        }
        if(!reason || reason == ""){
            return getResponse("Reason is required", 500, false)
        }
        if(!startDate || startDate == ""){
            return getResponse("Start Date is required", 500, false)
        }
        if(!endDate || endDate == ""){
            return getResponse("End Date is required", 500, false)
        }
        if(!approvedBy || approvedBy == ""){
            return getResponse("Approved By is required", 500, false)
        }
        if(!leaveType || leaveType == ""){
            return getResponse("Leave Type is required", 500, false)
        }

        if(leaveType == "Full Day"){
           
            const eDate = new Date(endDate);
            const sDate = new Date(startDate);

            eDate.setHours(0, 0, 0, 0)
            sDate.setHours(0, 0, 0, 0)

            const takenLeave = ((eDate-sDate)/(1000 * 60 * 60 * 24))+1
            
            if(takenLeave> token.user.leaveBalance){
                return NextResponse.json({message: "You Can not Take a leave", status:300})
            }
        }

        if(leaveType == "Half Day"){
           
            const takenLeave = 0.5
            
            if(takenLeave> token.user.leaveBalance){
                return NextResponse.json({message: "You Can not Take a leave", status:300})
            }
        }


        const leave = new Leave({
            userId,
            userName,
            reason,
            startDate,
            endDate,
            approvedBy,
            appliedDate: Date.now(),
            leaveType
        })
        await leave.save()

    return NextResponse.json({
        data: "leave saved",
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