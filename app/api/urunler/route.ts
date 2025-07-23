//C:\Users\MONSTER\sanayi-site\app\api\urunler\route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Urun } from "@/models/Urun";

// 🟢 Ürün Ekleme
export async function POST(req: Request) {
    try {
        const body = await req.json();
        if ('_id' in body) delete body._id;

        body.stok = Number(body.stok) || 0;

        const yeniUrun = await Urun.create(body);
        return NextResponse.json({ success: true, urun: yeniUrun });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Ekleme başarısız" }, { status: 500 });
    }
}

// 🔵 Ürün Listeleme
export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get("kategori");

        const urunler = kategori
            ? await Urun.find({ kategori })
            : await Urun.find();

        return NextResponse.json(urunler);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Veri alınamadı" }, { status: 500 });
    }
}
