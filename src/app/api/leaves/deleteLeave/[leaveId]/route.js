import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Leave } from "@/modelCS/leave";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";


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

            leave.isDeleted = true


            const updatedLeave = await leave.save()

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
