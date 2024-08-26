import { dbConnect } from "@/helpers/db";
import { UserCS } from "@/modelCS/user";
import { NextResponse } from "next/server";
import TaskList from "@/modelCS/tasklist";
import Workspace from "@/modelCS/workspace";


// assign list to user
export async function PUT(request, { params }) {
    dbConnect();
    try {

        
        const { user_id } = params;
        let requestBody;
        try {
            requestBody = await request.json();
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return NextResponse.json({ message: "Invalid JSON format" }, { status: 400 });
        }

        const {tasklist_id}  =requestBody;
        
        // console.log(tasklist_id,user_id);

        const list = await TaskList.findOne({ _id: tasklist_id });
        console.count("here");

        if(!list){
            return NextResponse.json({message:"Tasklist not found"},{status:404});
        }
        console.count("here");
        const isUserExistInList = await TaskList.findOne({ assign_to: user_id });
        console.count("here");

        if (isUserExistInList) {
            return NextResponse.json({ message: "User already present" }, { status: 400 });
        }
        console.count("here");
        const workspace = await Workspace.findOne({ _id: list.workspace_id });
        console.count("here");
        if(!workspace){
            return NextResponse.json({message:"workspace not found"},{status:404});

        }
        const isUserExistInWorspace = await Workspace.findOne({ members:user_id});

        if (!isUserExistInWorspace) {
            const workspace = await Workspace.findOneAndUpdate({ _id: list.workspace_id }, {
                $push: { members: user_id }
            }, { new: true });
        }



        const tasklist = await TaskList.findOneAndUpdate({ _id: tasklist_id }, {
            $push: { assign_to: user_id }
        }, { new: true });



        return NextResponse.json({ message: `Tasklist assigned `, data: tasklist }, { status: 200 });

    } catch (error) {

        console.log("Failed to Assign Tasklist", error);
        return NextResponse.json({ message: "Failed to Assign Tasklist" }, { status: 200 });

    }
}