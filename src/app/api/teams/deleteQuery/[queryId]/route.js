import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Query } from "@/modelCS/query";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";


export async function PUT(request, { params }) {

  await dbConnect();

  try {

    const token = await verifyToken()

    if (token == "" || !token) {
      return NextResponse.json({ message: "login required" });
    }

    const { queryId } = params

    if (token && token.user.accessId == 1) {


      const query = await Query.findById(queryId);
      query.isDeleted = true

      const updatedQuery = await query.save()

      return NextResponse.json({
        data: updatedQuery,
        message: "Query Deleted Successfully",
        status: 200
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
