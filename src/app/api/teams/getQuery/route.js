import { getResponse } from "@/helpers/responseMessage";
import { Query } from "@/modelCS/query";
import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/tokenVerify";
import {UserCS} from '@/modelCS/user'
import { dbConnect } from "@/helpers/db"

export async function GET(request) {

  await dbConnect()

  try{

      const token = await verifyToken()

    if(token== "" || !token){
      return NextResponse.json({message: "login required"});
  }
  // for local pragati mongoid = 66da8f154eb2cd1b2374b1b3 
    if(token && token.user.accessId ==1 || token && token.user._id =="66c4374c872fcfa51ba1bf96"){

      const query = await Query.find({isDeleted:false}).populate("assignTo",{"firstName":1,"accessId":1},UserCS).sort({"queryDate":-1})
      console.log("this is populated 1", query)

      const totalCount = await Query.countDocuments({
        isDeleted: false 
        });

      const prematureCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Premature" 
      });

      const prospectCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Prospect" 
      });
      const DNPCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "DNP" 
      });

      const meetingCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Meeting" 
      });
      const closedCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Closed" 
      });      
      const notinterstedCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Not Intersted" 
      });


      return NextResponse.json({
        query,
        totalCount,
        prematureCount,
        prospectCount,
        DNPCount,
        meetingCount,
        closedCount,
        notinterstedCount
      })
    }
    if(token && token.user.accessId == 2){

      const query = await Query.find(

        {
        isDeleted: false,
        assignTo: token.user._id
      }

      // {$or:[
      //   {
      //       isDeleted: false,
      //       assignTo: token.user._id,

      //   },
      //   {
      //       isDeleted: false,
      //       createdBy: token.user._id
      //   }]

      // }
      ).populate("assignTo","firstName",UserCS).sort({"queryDate":-1})

      const totalCount = await Query.countDocuments({
        isDeleted: false,
        assignTo: token.user._id
        });

      const prematureCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Premature",
        assignTo: token.user._id
      });

      const prospectCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Prospect" ,
        assignTo: token.user._id
      });
      const DNPCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "DNP",
        assignTo: token.user._id
      });

      const meetingCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Meeting",
        assignTo: token.user._id
      });
      const closedCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Closed",
        assignTo: token.user._id
      });      
      const notinterstedCount = await Query.countDocuments({
        isDeleted: false, 
        remarks: "Not Intersted",
        assignTo: token.user._id

      });
      return NextResponse.json({
        query,
        totalCount,
        prematureCount,
        prospectCount,
        DNPCount,
        meetingCount,
        closedCount,
        notinterstedCount
      })
    }


    else {
      return NextResponse.json({message: "login with right credentials"})
    }

  }

  catch(error){
    return NextResponse.json(error)
  }

}
