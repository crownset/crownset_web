import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Leave } from "@/modelCS/leave";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";
import { UserCS } from "@/modelCS/user";

export async function PUT(request, { params }) {

  await dbConnect();

  const {
    // reason,
    // startDate,
    // endDate,
    // approvedBy,
    status,
    // leaveType
  } = await request.json()

  try {

    const token = await verifyToken()

    if (token == "" || !token) {
      return NextResponse.json({ message: "login required" });
    }

    const { leaveId } = params

    if (token && token.user.accessId == 1) {

      const leave = await Leave.findById(leaveId);

      if (leave.status == 'Approved' || leave.status == 'Reject') {

        return NextResponse.json({ message: "You can't update" })
      }


      leave.status = status

      const updatedLeave = await leave.save()

      const user = await UserCS.findById(updatedLeave.userId)

      if(updatedLeave.status == 'Approved'){
        if(updatedLeave.leaveType == 'Full Day'){

          const eDate = new Date(updatedLeave.endDate);
          const sDate = new Date(updatedLeave.startDate);

          eDate.setHours(0, 0, 0, 0)
          sDate.setHours(0, 0, 0, 0)

          const takenLeave = ((eDate-sDate)/(1000 * 60 * 60 * 24))+1

          user.leaveBalance -= takenLeave

          const updatedUser = await user.save()
        }

        if(updatedLeave.leaveType == 'Half Day'){

          
          const takenLeave = 0.5

          user.leaveBalance -= takenLeave

          const updatedUser = await user.save()
        }
        console.log("updatedLeave>>>>",updatedLeave)
      }

      return NextResponse.json({
        data: updatedLeave,
        message: "Leave Successfully Updated",
        status: 200
      });
    }

    if (token && token.user.accessId == 2) {

      // const leave = await Leave.findById(leaveId);

      // if(leave.status =='Approved' || leave.status =='Reject'){

      //   return NextResponse.json({message: "You can't update"})
      // }

      // leave.reason = reason
      // leave.startDate = startDate,
      // leave.endDate = endDate,
      // leave.approvedBy = approvedBy
      // leave.leaveType = leaveType


      // const updatedLeave = await leave.save()

      return NextResponse.json({
        message: "You Can't update leave",
        status: 300
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
