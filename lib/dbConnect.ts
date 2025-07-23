//C:\Users\MONSTER\sanayi-site\lib\dbConnect.ts
import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/sanayi"; // Yerel bağlantı

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI tanımlı değil");
}

let isConnected = false;

export async function dbConnect() {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "sanayi",
        });
        isConnected = true;
        console.log("✅ MongoDB bağlantısı başarılı (lokal)");
    } catch (error) {
        console.error("❌ MongoDB bağlantı hatası:", error);
        throw error;
    }
}
