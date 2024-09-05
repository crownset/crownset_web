
import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import { dbConnect } from "@/helpers/db";

export async function GET(request) {

    await dbConnect()

    try{

        console.log('Cron job running at 18.45');

        const users = await UserCS.find({});
    
        users.forEach(async (user) => {
            const newLeaveBalance = Math.min(user.leaveBalance + 1.25, 15); // Cap at 18
            user.leaveBalance = newLeaveBalance;
            await user.save();
        });

        return NextResponse.json({
            message: "cron job works"
        })

    }

    catch(error){

        console.log(error)

        return NextResponse.json({
            message: "error in post request",
            status: 300
        })

    }

}