// C:\Users\MONSTER\sanayi-site\models\Urun.ts
import mongoose from "mongoose";

const urunSchema = new mongoose.Schema({
    ad: String,
    aciklama: String,
    fiyat: Number,
    resim: String,
    kategori: String,
    stok: {
        type: Number,
        default: 0,
    },
});

export const Urun = mongoose.models.Urun || mongoose.model("Urun", urunSchema);

