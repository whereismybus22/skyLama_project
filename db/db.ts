import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 1. User Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// 2. Project Schema
const projectSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// 3. Project File Schema
const projectFileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, default:"txt" },
  project: { type: ObjectId, ref: "Project", required: true },
  createdAt: { type: Date, default: Date.now },
});

// 4. Project File Content Schema
const projectFileContentSchema = new Schema({
  content: { type: String, required: true },
  projectFile: { type: ObjectId, ref: "ProjectFile", required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

// Prevent OverwriteModelError
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
export const ProjectFile = mongoose.models.ProjectFile || mongoose.model("ProjectFile", projectFileSchema);
export const ProjectFileContent = mongoose.models.ProjectFileContent || mongoose.model("ProjectFileContent", projectFileContentSchema);
