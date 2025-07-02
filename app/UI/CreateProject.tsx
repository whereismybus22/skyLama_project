"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from 'lucide-react';

export function CreateProject() {
  const [projectName, setProjectName] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!projectName.trim()) return

      const response = await axios.post("/api/projects", {
        name: projectName,
      })

      if (response.status === 201) {
        router.push("/dashboard/projects")
      }
    } catch (error) {
      console.error("Error creating project:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#211935] w-[13vw] h-[6.8vh] rounded-sm hover:bg-[#7E22CE] duration-300 hover:shadow-lg hover:shadow-[#7E22CE] text-white" variant="outline">
           Create New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[70vw] h-[30vh] ">
        <form onSubmit={handleSubmit}>
          <DialogHeader className=" w-full h-[5vh]  " >
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>

          <div className=" w-full grid gap-4">
            <div className=" w-full grid gap-3">
              <Label htmlFor="project-name">Enter your project name</Label>
              <Input
                id="project-name"
                name="name"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className=" w-[35vw] "
              />
            </div>
          </div>

          <DialogFooter className="pt-5">
            <DialogClose asChild>
              <Button className=" bg-[#7E22CE] "  type="submit">Create Project</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
