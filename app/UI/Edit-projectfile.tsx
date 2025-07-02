"use client"
import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { useState,useEffect } from "react"
import axios from 'axios'
import { set } from 'mongoose'
import { text } from 'stream/consumers'
// import { FetchProjectFileContent } from '../actions/project'
interface EditProjectFileProps {
  filename: string;
  filecontentid: string;
}
const  EditProjectFile: React.FC<EditProjectFileProps> = ({ filename, filecontentid }) => {
    const [fileName, setFileName] = useState(filename || "");
    const [fileContent, setFileContent] = useState("");
    const [originContent,setOriginContent] = useState("");
    const handleSave = async(text: string) => {
      try{
        await axios.post(`/api/fileContent?fileId=${filecontentid}`, 
          { text: fileContent },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        setOriginContent(fileContent);
        console.log("File content saved successfully");
      }catch(error) {
        console.error("Error in Saving the file" , error)
      }
    }
    const handleEdit = async(fileId: string) => {
    try {
      const res = await axios.get(`/api/fileContent?fileId=${fileId}`);
      console.log(res.data.fileContent.content);
      setFileContent(res.data.fileContent.content || "");
      setOriginContent(res.data.fileContent.content || "");
      return res.data.fileContent.content || "";
    }catch(error) {
      console.error("Error in Editing the file" , error)
    }
  }
  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button onClick={async()=>{ await handleEdit(filecontentid)}}>Edit </Button>
          </DialogTrigger>
           <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={()=>{}}>
              <DialogHeader>
                <DialogTitle>Upload File</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                {/* <div className="grid gap-3">
                  <Label htmlFor="File-name">Update Your File Name</Label>
                  <Input
                    id="File-name"
                    name="name"
                    placeholder="File name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div> */}
                <div className="grid gap-3">
                  <Label htmlFor="Transcript">Transcript</Label>
                  <Textarea
                    id="Transcript"
                    name="Transcript"
                    placeholder="Transcript"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button disabled={fileContent===originContent} onClick={() => handleSave(fileContent)}>Save</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
  )
}

export default EditProjectFile;