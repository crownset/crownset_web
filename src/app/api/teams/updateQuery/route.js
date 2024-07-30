import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Query } from "@/modelCS/query";
import { dbConnect } from "@/helpers/db";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'


export async function PUT(request) {

  await dbConnect();

  const {_id, fullName, email, contact, businessName, queryContent, leadBy,assignTo,followUp,lastFollowUp,remarks} = await request.json()

  const cookie = cookies();

  const tokenCookie = cookie.getAll()[0].value;

  try {

    // const id = params

    if (!tokenCookie || tokenCookie == "") {
      return NextResponse.json({
        message: "Please login to access this page",
      });
    }

    const token = jwt.verify(tokenCookie, process.env.SECRET_KEY);
    console.log(token);

    console.log(token.user.accessId);

    if (token && token.user.accessId == 1) {


      const query = await Query.findById(_id);
      query.fullName = fullName,
      query.email = email,
      query.contact = contact,
      query.businessName = businessName,
      query.queryContent = queryContent,
      query.leadBy = leadBy,
      query.assignTo = assignTo,
      query.followUp = followUp,
      query.lastFollowUp = lastFollowUp,
      query.remarks = remarks
      
      const updatedQuery = await query.save()


      console.log(updatedQuery)

      return NextResponse.json({});
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
