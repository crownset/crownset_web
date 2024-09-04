import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Query } from "@/modelCS/query";
import { dbConnect } from "@/helpers/db"
import { verifyToken } from "@/helpers/tokenVerify";

export async function POST(request) {
  await dbConnect()
  const { queryData } = await request.json();

  try {

    const token = await verifyToken()

    if (token == "" || !token) {
      return NextResponse.json({ message: "login required" });
    }
    if ((token && token.user.accessId == 1) || (token && token.user.accessId == 2)) {

      for (const query of queryData) {

        if (!query.fullName || query.fullName == "") {
          return getResponse("Full Name is required", 500, false)
        }

        else if (!query.email || query.email == "") {
          return getResponse("Email is required field", 500, false)
        }

        else if (!query.contact || query.contact == "") {
          return getResponse("Contact is required field", 500, false)
        }

        else if (!query.businessName || query.businessName == "") {
          return getResponse("Business Name is required field", 500, false)
        }

        else if (!query.queryContent || query.queryContent == "") {
          return getResponse("Query Content is required field", 500, false)
        }

        else if (!query.comments || query.comments == "") {
          return getResponse("Comments is required field", 500, false)
        }
      }

      const savedQueries = await Query.insertMany(queryData);

      return NextResponse.json({
        data: savedQueries,
        message: "Query Saved Sucessfully",
      });
    }

    else {
      return getResponse("You Dont have a right credentials", 500, false)
    }

  } catch (error) {
    return getResponse("error in posting query", 500, false);
  }
}
