// pages/api/sendEmail.js
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
// import {template1} from '../../../templates/template1.hbs'
import { NextResponse } from 'next/server';

export async function POST(request) {


  try {

    const { mailData } = await request.json();

    console.log("Array>>>",mailData)
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service provider
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Read and compile the Handlebars template
    const templatePath = path.join(process.cwd(),"src","templates","template1.hbs")
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);

    for(const data of mailData){

      // Define email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: 'Follow-Up: Complimentary Growth Strategy Call',
        html: template({
          data
        })
      };
    

    // Send email
    await transporter.sendMail(mailOptions);
  }

    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error) {    
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error' })
  }
}
