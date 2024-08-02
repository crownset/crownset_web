import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Query } from "@/modelCS/query";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";


export async function PUT(request,{params}) {

  await dbConnect();

  const {assignTo,followUp,lastFollowUp,remarks,service} = await request.json()

  try {

    const token = await verifyToken()

    if(token== "" || !token){
        return NextResponse.json({message: "login required"});
    }

    const {queryId} = params

    if (token && token.user.accessId == 1) {


      const query = await Query.findById(queryId);
      query.assignTo = assignTo,
      query.followUp = followUp,
      query.lastFollowUp = lastFollowUp,
      query.remarks = remarks,
      query.service = service
      
      const updatedQuery = await query.save()

      return NextResponse.json({
        data: updatedQuery,
        message: "Query Successfully Updated",
        status: 200
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
