//C:\Users\MONSTER\sanayi-site\app\admin\page.tsx
"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [urunler, setUrunler] = useState([]);
    const [form, setForm] = useState({
        _id: "",
        ad: "",
        aciklama: "",
        fiyat: "",
        resim: "",
        kategori: "",
        stok: "", // stok string olarak tutulur
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "12345") {
            setAuthenticated(true);
            fetchUrunler();
        } else {
            alert("❌ Şifre yanlış");
        }
    };

    const fetchUrunler = async () => {
        const res = await fetch("/api/urunler");
        const data = await res.json();
        setUrunler(data);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = form._id ? "PUT" : "POST";
        const endpoint = form._id ? `/api/urunler/${form._id}` : "/api/urunler";

        const res = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                fiyat: parseFloat(form.fiyat),
                stok: parseInt(form.stok),
            }),

        });

        const result = await res.json();
        if (result.success) {
            alert(form._id ? "🟢 Güncellendi!" : "✅ Eklendi!");
            setForm({ _id: "", ad: "", aciklama: "", fiyat: "", resim: "", kategori: "", stok: "", });
            fetchUrunler();
        } else {
            alert("❌ Hata: " + result.error);
        }
    };

    const handleSil = async (id: string) => {
        if (!confirm("Emin misin?")) return;

        const res = await fetch(`/api/urunler/${id}`, { method: "DELETE" });
        const result = await res.json();

        if (result.success) {
            alert("🗑️ Silindi");
            fetchUrunler();
        } else {
            alert("❌ Silinemedi: " + result.error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const result = await res.json();
        if (result.success) {
            setForm((prev) => ({ ...prev, resim: result.path }));
        } else {
            alert("❌ Resim yüklenemedi");
        }
    };

    if (!authenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-900">
                <form onSubmit={handleLogin} className="bg-gray-800 text-white p-8 shadow-md rounded w-80 space-y-4">
                    <h1 className="text-xl font-bold text-center">🔐 Admin Girişi</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Şifre"
                        className="w-full border px-4 py-2 rounded bg-gray-700 text-white"
                        autoComplete="new-password"
                    />
                    <button className="w-full bg-blue-600 text-white py-2 rounded">Giriş Yap</button>
                </form>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white px-4 py-10 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">🛠️ Ürün Ekle / Düzenle</h1>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 shadow rounded grid gap-4 mb-10">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">📋 Ürün Bilgileri</h2>

                <input
                    name="ad"
                    value={form.ad}
                    onChange={handleChange}
                    placeholder="Ürün Adı"
                    className="border px-4 py-2 rounded bg-gray-800 text-white placeholder:text-gray-400"
                    required
                />

                <textarea
                    name="aciklama"
                    value={form.aciklama}
                    onChange={handleChange}
                    placeholder="Açıklama"
                    className="border px-4 py-2 rounded bg-gray-800 text-white placeholder:text-gray-400"
                    required
                />

                <input
                    name="fiyat"
                    value={form.fiyat}
                    onChange={handleChange}
                    placeholder="Fiyat"
                    type="number"
                    className="border px-4 py-2 rounded bg-gray-800 text-white placeholder:text-gray-400"
                    required
                />

                <input
                    name="stok"
                    value={form.stok ?? ""}
                    onChange={handleChange}
                    placeholder="Stok Adedi"
                    type="number"
                    className="border px-4 py-2 rounded bg-gray-800 text-white placeholder:text-gray-400"
                    required
                />





                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6">🖼️ Ürün Görseli</h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="border px-4 py-2 rounded bg-gray-800 text-white placeholder:text-gray-400"
                />

                {form.resim && (
                    <div className="mt-2">
                        <img src={form.resim} alt="Önizleme" className="h-32 rounded object-contain border border-gray-700 bg-white p-1" />
                    </div>
                )}

                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-6">📂 Kategori</h2>

                <select
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded bg-gray-800 text-white placeholder:text-gray-400"
                    required
                >
                    <option value="">Kategori Seç</option>
                    <option value="yedek-parcalar">Yedek Parçalar</option>
                    <option value="yaglar">Yağlar</option>
                </select>

                <button className="bg-green-600 hover:bg-green-700 transition text-white py-2 rounded">
                    {form._id ? "Güncelle" : "Ekle"}
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">📦 Ürün Listesi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {urunler.map((urun: any) => (
                    <div
                        key={urun._id}
                        className="bg-[#1c1f26] border border-gray-700 rounded-lg p-4 shadow hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
                    >
                        {urun.resim && (
                            <img
                                src={urun.resim}
                                alt={urun.ad}
                                className="w-full h-40 object-cover rounded mb-3"
                            />
                        )}
                        <h3 className="text-white font-semibold text-lg">{urun.ad}</h3>
                        <p className="text-gray-300">{urun.aciklama}</p>
                        <p className="text-green-400 font-bold mt-2">Fiyat: {urun.fiyat}₺</p>
                        <p className="text-sm text-gray-400">Kategori: {urun.kategori}</p>
                        <p className={`text-sm ${urun.stok === 0
                                ? "text-red-500"
                                : urun.stok !== undefined && urun.stok <= 3
                                    ? "text-orange-400"
                                    : "text-yellow-400"
                            }`}>
                            Stok: {
                                urun.stok === 0
                                    ? "Tükendi"
                                    : urun.stok !== undefined && urun.stok <= 3
                                        ? `Az Kaldı (${urun.stok})`
                                        : `${urun.stok ?? 0} adet`
                            }
                        </p>




                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() =>
                                    setForm({
                                        ...urun,
                                        fiyat: urun.fiyat.toString(),
                                        stok: urun.stok?.toString() ?? "", // stok forma set ediliyor
                                    })
                                }
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-1 rounded"
                            >
                                Düzenle
                            </button>
                            <button
                                onClick={() => handleSil(urun._id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
