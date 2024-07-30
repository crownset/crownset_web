import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Query } from "@/modelCS/query";
import { dbConnect } from "@/helpers/db"

export async function POST(request) {
  await dbConnect()
  const { fullName, email, contact, businessName, queryContent, leadBy } =
    await request.json();

  try {

    if(fullName == ""){
        return getResponse("Full Name is required", 500, false)
    }

    else if(email == ""){
        return getResponse("Email is required field", 500, false)
    }

    else if(contact == ""){
        return getResponse("Contact is required field", 500, false)
    }

    else if(businessName == ""){
        return getResponse("Business Name is required field", 500, false)
    }

    else if(queryContent == ""){
        return getResponse("Query Content is required field", 500, false)
    }

    else if(leadBy == ""){
        return getResponse("Lead By is required field", 500, false)
    }

    const query = await new Query({
      fullName,
      email,
      contact,
      businessName,
      queryContent,
      leadBy,
    });
    query.save();

    return NextResponse.json({
      message: "Query Saved Sucessfully",
    });
  } catch (error) {
    return getResponse("error in posting query", 500, false);
  }
}
