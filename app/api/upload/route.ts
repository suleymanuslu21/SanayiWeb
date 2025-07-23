//C:\Users\MONSTER\sanayi-site\app\api\upload\route.ts
import { NextRequest, NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

// Bu ayar gerekli (formidable için)
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    const data = await req.formData(); // ✅ Next.js 13+ ile önerilen yol

    const file = data.get("file") as File;
    if (!file) {
        return NextResponse.json({ success: false, error: "Dosya bulunamadı" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filename = Date.now() + "-" + file.name;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    return NextResponse.json({
        success: true,
        path: `/uploads/${filename}`,
    });
}
