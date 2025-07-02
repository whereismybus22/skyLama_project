import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { ProjectFile, ProjectFileContent } from "@/db/db";
import { connectToDatabase } from "@/app/lib/mongoose";

export async function GET(
  request: NextRequest, // Changed from "Request" to "request"
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  try {
    const { id: projectId } = await params;;

    if (!projectId || projectId.length !== 24) {
      return NextResponse.json({ error: "Invalid Project ID" }, { status: 400 });
    }

    const projectFiles = await ProjectFile.find({ project: projectId }).lean();
    return NextResponse.json(projectFiles, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest, // Changed from "req" to "request" for consistency
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  try {
    const { id: fileId } = await params;

    const res = await ProjectFile.deleteOne({ _id: fileId });
    const resFileContent = await ProjectFileContent.deleteOne({
      projectFile: fileId,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}