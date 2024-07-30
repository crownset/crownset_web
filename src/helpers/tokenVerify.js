import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function verifyToken(){

    const cookie = cookies();

    const tokenCookie = cookie.getAll()[0].value;

        var token = "" 

        console.log("tokenC", tokenCookie);
        if (!tokenCookie || tokenCookie == "") {
            return token
          }

          else{
            token = jwt.verify(tokenCookie, process.env.SECRET_KEY);
            
            return token

          }


}