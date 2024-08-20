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

async function mailResponse(fullName,email){
 
  const mailOptions = {
     from: 'thecrownset@gmail.com',
     to: `${email}`,
     subject: 'check mail',
     html: `Dear ${fullName},
     <br>
     <br>
     Thank you for reaching out to Crownset. We appreciate your interest and value your inquiry.
     <br>
     <br>
     One of our executives will be in touch with you shortly to discuss your needs and provide further assistance. If you have any immediate questions or need further information, please don’t hesitate to let us know.
     <br><br>
     Thank you once again for contacting us. We look forward to speaking with you soon.
     <br>
     <br>
     Best regards,
     <br>
     Crownset Marketing Agency
     <br>
     +91 8168695799`
 }

  return transporter.sendMail(mailOptions)

}

export async function POST(request) {
  await dbConnect()
  const { fullName, email, contact, businessName, queryContent, leadBy, service, comments } =
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
      service,
      comments
    });
    await query.save();

    await mailResponse(fullName,email)

    
    return NextResponse.json({
      message: "Query Saved Sucessfully",
    });
  } catch (error) {
    return getResponse("error in posting query", 500, false);
  }
}
