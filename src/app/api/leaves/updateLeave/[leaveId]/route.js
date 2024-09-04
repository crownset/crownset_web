import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Leave } from "@/modelCS/leave";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";


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
