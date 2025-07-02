// app/api/project/[id]/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { Project } from "@/db/db";
import { connectToDatabase } from "@/app/lib/mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const paramsData = await params
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  try {
    const project = await Project.findById(paramsData.id).lean();
    
    if (!project) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}
