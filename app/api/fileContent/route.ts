import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { ProjectFile, ProjectFileContent } from "@/db/db";
import { connectToDatabase } from "@/app/lib/mongoose";

export async function GET(
  request: NextRequest,
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const fileContent = await ProjectFileContent.findOne({ projectFile: fileId });
    return NextResponse.json({ fileContent }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}


export async function POST(
  request: NextRequest,
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");
  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  }

  await connectToDatabase();

try {
    const { text } = await request.json();
    if (typeof text !== "string") {
        return NextResponse.json({ error: "Missing or invalid text" }, { status: 400 });
    }
    // Upsert file content using Mongoose's findOneAndUpdate with upsert option
    const fileContent = await ProjectFileContent.findOneAndUpdate(
        { projectFile: fileId },
        { content: text },
        { new: true, upsert: true }
    );

    return NextResponse.json({ fileContent }, { status: 200 });
} catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
}