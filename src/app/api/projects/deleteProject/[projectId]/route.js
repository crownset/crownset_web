import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Project } from "@/modelCS/project";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";


export async function PUT(request,{params}) {

  await dbConnect();

  try {

    const token = await verifyToken()

    if(token== "" || !token){
        return NextResponse.json({message: "login required"});
    }

    const {projectId} = params

    if (token && token.user.accessId == 1) {


      const project = await Project.findById(projectId);
      project.isDeleted = true
      
      const updatedProject = await project.save()

      return NextResponse.json({
        data: updatedProject,
        message: "Project Deleted Successfully",
        status: 200
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
