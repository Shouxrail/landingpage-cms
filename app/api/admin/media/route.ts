import { db } from "@/db";
import { media as mediaTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const media = await db.query.media.findMany({
    orderBy: (media, { desc }) => [desc(media.createdAt)],
  });
  return NextResponse.json(media);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filePath = join(uploadDir, fileName);

    // Ensure upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file to disk
    await writeFile(filePath, buffer);

    const storagePath = `/uploads/${fileName}`;

    // Save metadata to database
    const [result] = await db.insert(mediaTable).values({
      fileName: file.name,
      storagePath: storagePath,
      mimeType: file.type,
      size: file.size,
    });

    return NextResponse.json({ 
        id: result.insertId,
        fileName: file.name,
        storagePath: storagePath
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
