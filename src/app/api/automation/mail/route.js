// pages/api/sendEmail.js
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
// import {template1} from '../../../templates/template1.hbs'
import { verifyToken } from "@/helpers/tokenVerify";
import twilio from 'twilio';
import { NextResponse } from 'next/server';

export async function POST(request) {

  const { mailData } = await request.json();
  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;
  // const client = twilio(accountSid, authToken);


  try {

    const token = await verifyToken()

    if(token== "" || !token){
      return NextResponse.json({message: "login required"});
  }
  if(token && token.user.accessId !=1){
    return NextResponse.json({message: "login with right credential"});
  }
    if(token && token.user.accessId ==1){

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Read and compile the Handlebars template
    const templatePath = path.join(process.cwd(),"src","templates","template1.hbs")
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    if(mailData.length == 0){
      return NextResponse.json({message: "no data found in excel sheet"});
    }
    for(const data of mailData){

      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: data.email,
        subject: 'Follow-Up: Complimentary Growth Strategy Call',
        html: template()
      };
    
    await transporter.sendMail(mailOptions);

    // const response = await client.messages.create({
    //   body: template(),
    //   from: 'whatsapp:+14155238886', // Twilio Sandbox number or your own WhatsApp-enabled number
    //   to: `whatsapp:+91${data.pno}`,
    // })
  }
}

    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {    
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error' })
  }
}
