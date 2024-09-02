import Workspace from "@/modelCS/workspace";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


import { dbConnect } from "@/helpers/db"

// create workspace
export async function POST(request) {
    await dbConnect()

    try {

        const token = request.cookies.get("authToken:")?.value || '';

        if(!token){
            return NextResponse.json({message:"Please Login First"},{status:401})
        }
        
        const decode = await jwt.verify(token,process.env.SECRET_KEY)
        if(!decode){
            return NextResponse.json({message:"You are not authorized"},{status:401})
        }


        const user = decode.user;
        if(!user.accessId || user.accessId !== 1){
              console.log("Not Authorized");
              return NextResponse.json({message:"You are not authorized"},{status:401})  
        }
        const reqBody =  await request.json();

        if(reqBody.name ==''){
            return NextResponse.json({message:"workspace name is required"},{status:404});
        }
        
        
        const newWorkspace = new Workspace({
            name:reqBody.name,
            createdBy:user._id,
        })

        const workspace = await Workspace.create(newWorkspace);
        return NextResponse.json({
            message:"workspace is created",
            data:workspace
        },{status:201})

    } catch (error) {
        console.log("Error in creating Workspace");

        return NextResponse.json({
            message: "Error in creating Workspace"
        }, { status: 500 })
    }
}
