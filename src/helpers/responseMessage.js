import { NextResponse } from "next/server";

export function getResponse(messageText,statusCode,successStatus){

    return NextResponse.json({
        message: messageText,
        status: statusCode
    },{
        success: successStatus
    })
}