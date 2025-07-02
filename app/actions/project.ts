"use server"
import { User ,Project } from "@/db/db"
import { connectToDatabase } from "@/app/lib/mongoose"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { NextResponse } from "next/server"

export async function FetchProjects() {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    await connectToDatabase()
    const projects = await Project.find({ owner: session.user.id }).lean()
    
    return NextResponse.json(projects, { status: 200 })
}