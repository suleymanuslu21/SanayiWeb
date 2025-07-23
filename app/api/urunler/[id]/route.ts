//C:\Users\MONSTER\sanayi-site\app\api\urunler\[id]\route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

import { Urun } from "@/models/Urun";


//
// DELETE metodu
//
export async function DELETE(_: Request, context: { params: any }) {
  try {
    await dbConnect();
    const { id } = await Promise.resolve(context.params);

    const silinen = await Urun.findByIdAndDelete(id);
    if (!silinen) {
      return NextResponse.json({ success: false, error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true, mesaj: "Silindi" });
  } catch (error) {
    console.error("❌ Silme hatası:", error);
    return NextResponse.json({ success: false, error: "Silinemedi" }, { status: 500 });
  }
}
// PUT metodu
export async function PUT(req: Request, context: { params: any }) {
  try {
    await dbConnect();

    const body = await req.json();
    const { id } = await Promise.resolve(context.params); // ✅ Burada await önemli

    const updateData = {
      ad: body.ad,
      aciklama: body.aciklama,
      fiyat: Number(body.fiyat),
      kategori: body.kategori,
      resim: body.resim,
      stok: Number(body.stok), // ✅ Stok burada


    };
    console.log("📦 Güncelleme isteği:", updateData);

    const updated = await Urun.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ success: true, urun: updated });
  } catch (error) {
    console.error("❌ Güncelleme hatası:", error);
    return NextResponse.json({ success: false, error: "Güncelleme başarısız" }, { status: 500 });
  }
}



