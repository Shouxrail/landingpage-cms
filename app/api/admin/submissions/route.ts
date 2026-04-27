// app/api/admin/submissions/route.ts
import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const submissions = await db.query.formSubmissions.findMany({
            orderBy: [desc(formSubmissions.createdAt)],
            with: {
                page: true
            }
        });
        return NextResponse.json(submissions);
    } catch (error) {
        console.error("Failed to fetch submissions:", error);
        return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
    }
}
