import { db } from "@/db";
import { media as mediaTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mediaId = parseInt(id);

  if (isNaN(mediaId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const media = await db.query.media.findFirst({
      where: eq(mediaTable.id, mediaId),
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Delete from file system
    const filePath = join(process.cwd(), "public", media.storagePath);
    try {
        await unlink(filePath);
    } catch (err) {
        console.error("File deletion error (disk):", err);
        // Continue if file is already gone
    }

    // Delete from database
    await db.delete(mediaTable).where(eq(mediaTable.id, mediaId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
