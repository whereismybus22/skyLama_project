// app/api/project/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { Project } from "@/db/db"; 
import { connectToDatabase } from "@/app/lib/mongoose";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectToDatabase();
    const projects = await Project.find({ owner: session.user.id }).lean();
    return NextResponse.json(projects, { status: 200 });

}

export async function POST(req: Request) {

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await connectToDatabase();
  console.log(body.name , session.user.id);
  
  try {
    
    const newProject = await Project.create({
      name: body.name,
      owner: session.user.id,
    });
  
    return NextResponse.json(newProject, { status: 201 });
  } catch(error) {
    console.error("Can't create Project" , error)
  }
}
