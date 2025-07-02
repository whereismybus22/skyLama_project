"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"
import EditProjectFile from "./Edit-projectfile";

interface file {
  _id:string,
  name:string,
  createdAt:string
}

interface FilesProps {
  files: file[];
  onDelete: (fileId: string) => void;
  onEdit:(fileId : string) => void
}

export default function Files({ files, onDelete , onEdit }: FilesProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>File Name</TableHead>
          <TableHead>Upload Date & Time</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file, index) => (
          <TableRow key={file._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{file.name}</TableCell>
            <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-center flex gap-2 justify-center items-center">
              <EditProjectFile filename={file.name} filecontentid={file._id}  />
              <Button onClick={() => onDelete(file._id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}