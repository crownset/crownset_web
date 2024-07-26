import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";

const config = {
    isConnected: 0
}

export async function dbConnect(){

    if(config.isConnected){
        return;
    }


    try{

        cookies().set("authToken:", "")


        console.log(process.env.URL)
        const {connection} = await mongoose.connect(process.env.URL,{
            dbName:"Work",})



        console.log("CONNECTION",connection.readyState)
        console.log("db Connected")
        config.isConnected = connection._readyState


    }
    catch(error){
        console.log("error found")
        console.log(error)
    }
    
}