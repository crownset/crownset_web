import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Leave } from "@/modelCS/leave";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";
import { UserCS } from "@/modelCS/user";


export async function PUT(request, { params }) {

    await dbConnect();

    try {

        const token = await verifyToken()

        if (token == "" || !token) {
            return NextResponse.json({ message: "login required" });
        }

        const { leaveId } = params

        if (token && token.user.accessId == 2) {

            const leave = await Leave.findById(leaveId);

            if(leave.status =='Approved' || leave.status =='Reject'){

                if(leave.startDate<= Date.now()){

                return NextResponse.json({message: "You can't delete"})
            }
              }
              
            leave.isDeleted = true
            const updatedLeave = await leave.save()

            const user = await UserCS.findById(leave.userId)

            if(leave.leaveType == 'Full Day'){

                const eDate = new Date(leave.endDate);
                const sDate = new Date(updatedLeave.startDate);
      
                eDate.setHours(0, 0, 0, 0)
                sDate.setHours(0, 0, 0, 0)
      
                const takenLeave = ((eDate-sDate)/(1000 * 60 * 60 * 24))+1
      
                user.leaveBalance += takenLeave
      
                const updatedUser = await user.save()
              }
      
              if(updatedLeave.leaveType == 'Half Day'){
                
                const takenLeave = 0.5
      
                user.leaveBalance += takenLeave
      
                const updatedUser = await user.save()
              }

            // logic for if we delete the leave after approved before the start date the leave added



            return NextResponse.json({
                data: updatedLeave,
                message: "Leave Successfully Deleted",
                status: 200
            });
        }

        if (token && token.user.accessId !== 2) {

            return NextResponse.json({
                message: "Only User Can Delete Leave",
            });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}
