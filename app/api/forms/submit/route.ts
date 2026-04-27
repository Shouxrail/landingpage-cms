// app/api/forms/submit/route.ts
import { db } from "@/db";
import { formSubmissions, landingPages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { formId, data, pageUrl } = body;
        
        const headerList = await headers();
        const userAgent = headerList.get("user-agent");
        const userIp = headerList.get("x-forwarded-for")?.split(',')[0] || headerList.get("x-real-ip");

        // Try to find the page by URL slug
        let pageId = null;
        try {
            const url = new URL(pageUrl);
            const path = url.pathname.replace(/^\/|\/$/g, '');
            const slug = path === "" ? "home" : path;

            const page = await db.query.landingPages.findFirst({
                where: eq(landingPages.slug, slug)
            });
            if (page) pageId = page.id;
        } catch (e) {
            console.error("Could not determine page from URL:", pageUrl);
        }

        await db.insert(formSubmissions).values({
            pageId: pageId,
            formId: formId || "default",
            data: data,
            userAgent: userAgent,
            userIp: userIp,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Form submission error:", error);
        return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }
}
