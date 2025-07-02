"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import FileUploadPng from "@/public/ic_round-upload.png"
import YTPNG from "@/public/YT.png"
import RSSPNG from "@/public/RSS.png"
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
import { Textarea } from "@/components/ui/textarea";
import Files from "@/app/UI/Files";
import Upload from "@/public/Upload.png"

interface file {
  _id:string,
  name:string,
  createdAt:string
}

export default function Page() {
  const { projectId } = useParams();
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [files, setFiles] = useState<file[]>([]);

  // Fetch project and files
  useEffect(() => {
    async function fetchData() {
      if (!projectId) return;

      const filesRes = await axios.get(`/api/file/${projectId}`);
      setFiles(filesRes.data);
    }

    fetchData();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/file", {
        name: fileName,
        projectId: projectId,
        data: fileContent,
      });

      setFileName("");
      setFileContent("");

      const { data: updatedFiles } = await axios.get(`/api/file/${projectId}`);
      setFiles(updatedFiles); 
    } catch (error) {
      console.error("Error during File Uploading", error);
    }
  };
  const handleEdit = async(fileId: string) => {
    try {
      const res = await axios.get(`/api/fileContent?fileId=${fileId}`);
      console.log(res.data.fileContent.content);
      
    }catch(error) {
      console.error("Error in Editing the file" , error)
    }
  }

  const handleDelete = async (fileId: string) => {
    try {
      await axios.delete(`/api/file/${fileId}`);
      setFiles((prev) => prev.filter((f) => f._id !== fileId));
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  const UploadFile = () => {
    return <div className=" w-full h-[40vh] flex flex-col items-center justify-center gap-[3vh] " >
      <div>
        <Image src={Upload} alt="Upload Image Here" />
      </div>
      <div className=" flex flex-col items-center justify-center gap-[0.5vh] " >
        <div className="text-lg font-extrabold " >Select a file or drag and drop here (Podcast Media or Transcription Text)</div>
        <div className=" font-semibold " > MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </div>
         <Dialog >
          <DialogTrigger asChild>
            <Button className=" w-[10vw] bg-white text-black hover:bg-[#7E22CE] border border-[#7E22CE] h-[8vh] rounded-4xl font-extrabold mt-[5vh] " >Select File</Button>
          </DialogTrigger>
           <DialogContent className="w-[40vw] ">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className=" mb-2 " >Upload File</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="File-name">Enter Your File Name</Label>
                  <Input
                    id="File-name"
                    name="name"
                    placeholder="File name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
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
                  <Button type="submit">Upload</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  }

  return (
    <div className=" min-h-screen p-4 bg-gray-100">
      <div className=" text-2xl font-extrabold mb-3 " >Add Projects</div>
      <div className=" w-full h-[20vh] flex justify-evenly items-center " >
        <Dialog>
          <DialogTrigger asChild>
            <div className=" w-[20vw] h-[20vh] shadow-2xl flex items-center rounded-xl justify-evenly p-2 " >
              <div className=" w-[12vw]  " >
                <div className=" text-xl font-bold " >Upload Files</div>
                <div className=" text-sm " >Lorem ipsum dolor sit. Dolor lorem sit.</div>
              </div>
              <div className=" w-[4vw] h-[4vw] border " >
                <Image src={FileUploadPng} alt="Image Here" />
              </div>
            </div>
          </DialogTrigger>
           <DialogContent className="w-[40vw]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className=" mb-2 " >Upload File</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="File-name">Enter Your File Name</Label>
                  <Input
                    id="File-name"
                    name="name"
                    placeholder="File name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
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
                  <Button type="submit">Upload</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
         <div className=" w-[20vw] h-[20vh] shadow-2xl flex items-center rounded-xl justify-evenly p-2 " >
              <div className=" w-[12vw]  " >
                <div className=" text-xl font-bold " >Youtube Video</div>
                <div className=" text-sm " >Lorem ipsum dolor sit. Dolor lorem sit.</div>
              </div>
              <div className=" w-[4vw] h-[4vw] border " >
                <Image src={YTPNG} alt="Image Here" />
              </div>
          </div>
          <div className=" w-[20vw] h-[20vh] shadow-2xl flex items-center rounded-xl justify-evenly p-2 " >
              <div className=" w-[12vw]  " >
                <div className=" text-xl font-bold " >RSS Feed</div>
                <div className=" text-sm " >Lorem ipsum dolor sit. Dolor lorem sit.</div>
              </div>
              <div className=" w-[4vw] h-[4vw] border " >
                <Image src={RSSPNG} alt="Image Here" />
              </div>
          </div>
      </div>
       <div className="w-full h-[55vh] overflow-scroll border border-black overflow-x-hidden p-4 mt-8">
        <div className="text-xl font-extrabold">Your Files</div>
        {files.length === 0 ? (
            // <UploadFile />
            <div className="w-full h-[40vh] flex items-center justify-center " >No Files , Please Upload Your Files</div>
        ) : (
          <Files files={files} onDelete={handleDelete} onEdit={handleEdit} />
        )}
      </div>
    </div>
  );
}
