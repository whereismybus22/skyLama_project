// app/api/file/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { ProjectFile , ProjectFileContent } from "@/db/db"; 
import { connectToDatabase } from "@/app/lib/mongoose";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await connectToDatabase();
    
  const newProjectFile = await ProjectFile.create({
    name:body?.name,
    project:body?.projectId
  })
  
  const newProjectFileContent = await ProjectFileContent.create({
    projectFile: newProjectFile._id,
    content:body.data
  })

  return NextResponse.json({ newProjectFile , newProjectFileContent } , { status: 201 });
}
