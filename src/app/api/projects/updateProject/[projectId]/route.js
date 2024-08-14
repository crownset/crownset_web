import { getResponse } from "@/helpers/responseMessage";
import { NextResponse } from "next/server";
import { Project } from "@/modelCS/project";
import { dbConnect } from "@/helpers/db";
import { verifyToken } from "@/helpers/tokenVerify";


export async function PUT(request,{params}) {

  await dbConnect();

  const {
    name,
    email,
    contactNo,
    businessName,
    projectBy,
    deadLine,
    lastFollowUp,
    remarks,
    assignTo} = await request.json()

  try {

    const token = await verifyToken()

    if(token== "" || !token){
        return NextResponse.json({message: "login required"});
    }

    const {projectId} = params

    if (token && token.user.accessId == 1) {


      const project = await Project.findById(projectId);
      
      project.name = name
      project.email = email
      project.contactNo = contactNo
      project.businessName = businessName
      project.projectBy = projectBy
      project.deadLine = deadLine
      project.lastFollowUp = lastFollowUp
      project.remarks = remarks
      project.assignTo = assignTo
      
      const updatedProject = await project.save()

      return NextResponse.json({
        data: updatedProject,
        message: "Project Successfully Updated",
        status: 200
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}
