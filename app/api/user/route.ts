import { User } from "@/db/db";
import { connectToDatabase } from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user || !session.user.id) {
    return NextResponse.json({ error: "Invalid session user" }, { status: 400 });
  }

  const user = await User.findById(session.user.id).select("-password");
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}