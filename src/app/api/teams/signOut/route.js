import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { UserCS } from "@/modelCS/user";
import { dbConnect } from "@/helpers/db"

export async function GET(request){

    await dbConnect()

    try{

        const tokenCookie = await cookies().getAll()[0].value

        if(!tokenCookie || tokenCookie == ''){
            return NextResponse.json({
                message: "you are already Sign Out"
            })
        }

        const encryptedToken = jwt.verify(tokenCookie, process.env.SECRET_KEY);

        const email = encryptedToken.user.email

        const token = ""

        const clearToken = cookies().set("authToken:", token)
        
        const user = await UserCS.findOne({ email: email });

        user.isActive = false

        await user.save()
    
        return NextResponse.json({
            message: "Log Out Successfully",
            status: 200
        })
    

    }

    catch(error){

        return NextResponse.json({
            message: "error in clearing cookies",
            status : 500
        })
    }


}