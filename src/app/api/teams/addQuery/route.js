import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Query } from "@/modelCS/query";
import { dbConnect } from "@/helpers/db"
import nodeMailer from 'nodemailer';

const userName = process.env.EMAIL_ID;
const passWord = process.env.EMAIL_PASS;

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
      user: userName,
      pass: passWord
  }
})

async function mailResponse(email){
 
  const mailOptions = {
     from: 'sudheerskb9@gmail.com',
  //    to:   'garvrakheja19@gmail.com',
  //    to:   ['vsudheerverma@gmail.com'],
     to: `${email}`,
     subject: 'check mail',
     html: `<p> form is submitted our sales executive contact you soon </p>`
 }

  return transporter.sendMail(mailOptions)

}

export async function POST(request) {
  await dbConnect()
  const { fullName, email, contact, businessName, queryContent, leadBy, service } =
    await request.json();

  try {

    if(!fullName || fullName == ""){
        return getResponse("Full Name is required", 500, false)
    }

    else if(!email || email == ""){
        return getResponse("Email is required field", 500, false)
    }

    else if(!contact || contact == ""){
        return getResponse("Contact is required field", 500, false)
    }

    else if(!businessName || businessName == ""){
        return getResponse("Business Name is required field", 500, false)
    }

    else if(!queryContent || queryContent == ""){
        return getResponse("Query Content is required field", 500, false)
    }

    else if(!leadBy || leadBy == ""){
        return getResponse("Lead By is required field", 500, false)
    }

    else if(!service || service == ""){
      return getResponse("Service is required field", 500, false)
  }

    const query = new Query({
      fullName,
      email,
      contact,
      businessName,
      queryContent,
      leadBy,
      service
    });
    await query.save();

    await mailResponse(email)

    
    return NextResponse.json({
      message: "Query Saved Sucessfully",
    });
  } catch (error) {
    return getResponse("error in posting query", 500, false);
  }
}
