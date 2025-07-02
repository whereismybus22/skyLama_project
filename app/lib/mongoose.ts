import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://abhinav:abhinav@cluster0.dzd4wi3.mongodb.net/"; // e.g., mongodb+srv://user:pass@cluster.mongodb.net/dbname

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
