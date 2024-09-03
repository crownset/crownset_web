import { UserCS } from "@/modelCS/user"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

import nodeMailer from 'nodemailer';

import { dbConnect } from "@/helpers/db"

const userName = process.env.EMAIL_ID;
const passWord = process.env.EMAIL_PASS;

// ---------------------

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: userName,
        pass: passWord
    }
})

async function mailCheck(resetToken,email){
   
    const mailOptions = {
       from: 'sudheerskb9@gmail.com',
    //    to:   'garvrakheja19@gmail.com',
    //    to:   ['vsudheerverma@gmail.com'],
       to: `${email}`,
       subject: 'check mail',
       html: `<p>this is a mail check <a href ="${process.env.RESET_URL}${resetToken}"> This is reset link </a> </p>`
   }

    return transporter.sendMail(mailOptions)

}


export async function POST(request){
    await dbConnect()
    const {email} = await request.json()
    try{
        
        const user = await UserCS.findOne({email})
        if(user == null){
            console.log("shghsguser", user)
            return NextResponse.json({
                message: "please enter valid email",
                status: 300
            })
        }
        else {


            user.resettoken = jwt.sign({email},process.env.SECRET_KEY,{expiresIn:"1h"})
            
            const updatedUser = await user.save()

            const resetToken = updatedUser.resettoken

            mailCheck(resetToken,email)

            console.log(process.env.RESET_URL+resetToken)
                        
            return NextResponse.json({
                message: "mail send successfully",
                staus: 200
            })
        }
    }
    catch(error){
        console.log(error)
        return NextResponse.json({
            message: "there is error in sending the mail",
            status: 500
        })
    }
}